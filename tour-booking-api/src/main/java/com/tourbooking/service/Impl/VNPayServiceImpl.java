package com.tourbooking.service.Impl;

import com.tourbooking.config.VNPayConfig;
import com.tourbooking.model.Bookings;
import com.tourbooking.model.PaymentQueryResponse;
import com.tourbooking.model.VNPay;
import com.tourbooking.repository.BookingsRepository;
import com.tourbooking.repository.VNPayRepository;
import com.tourbooking.service.VNPayService;
import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class VNPayServiceImpl implements VNPayService {
    @Autowired
    private VNPayRepository vnPayRepository;
    @Autowired
    private BookingsRepository bookingsRepository;
    @Autowired
    private VNPayConfig vnpayConfig;
    @Override
    public String createPayment(Bookings bookings) {
        if (bookings.getVnPay() != null) {
            return bookings.getVnPay().getPaymentUrl();
        }
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "topup";
        String vnp_IpAddr = "127.0.0.1";
        long amount = bookings.getTotal() * 100;

        // Định dạng ngày giờ hiện tại
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        formatter.setTimeZone(TimeZone.getTimeZone("GMT+7"));
        String vnp_CreateDate = formatter.format(new Date());

        // Tính toán thời gian hết hạn
        Calendar expireDate = Calendar.getInstance();
        expireDate.setTimeZone(TimeZone.getTimeZone("GMT+7"));
        expireDate.add(Calendar.MINUTE, 10); // Thêm 10 phút
        String vnp_ExpireDate = formatter.format(expireDate.getTime());

        // Setup parameters for the request
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnpayConfig.getVnp_TmnCode());
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", getRandomNumber(8));
        vnp_Params.put("vnp_OrderInfo",bookings.getCode());
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vnpayConfig.getVnp_Returnurl());
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

//        System.out.println("Mã TxnRef: " + vnp_Params.get("vnp_TxnRef"));
//        System.out.println("Mã CreateDate: " + vnp_Params.get("vnp_CreateDate"));

        String queryUrl = buildQueryUrl(vnp_Params, vnpayConfig.getVnp_HashSecret());
        String paymentUrl = vnpayConfig.getVnp_Url() + "?" + queryUrl;

        VNPay vnPay = vnPayRepository.save(
                        VNPay.builder()
                        .txnRef(vnp_Params.get("vnp_TxnRef"))
                        .transactionDate(vnp_Params.get("vnp_CreateDate"))
                        .paymentUrl(paymentUrl)
                        .build());
        bookings.setVnPay(vnPay);
        bookingsRepository.save(bookings);

        return paymentUrl;
    }


    public String getRandomNumber(int length) {
        String chars = "0123456789";
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++)
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        return sb.toString();
    }


    public String buildQueryUrl(Map<String, String> params, String hashSecret) {
        List<String> fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        try {
            for (String fieldName : fieldNames) {
                String fieldValue = params.get(fieldName);
                if ((fieldValue != null) && (fieldValue.length() > 0)) {
                    if (hashData.length() > 0) {
                        hashData.append('&');
                    }
                    hashData.append(fieldName);
                    hashData.append('=');
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    query.append('&');
                }
            }
            query.deleteCharAt(query.length() - 1);
            String secureHash = hmacSHA512(hashSecret, hashData.toString());
            query.append("&vnp_SecureHash=").append(secureHash);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return query.toString();
    }


    public String hmacSHA512(String key, String data) {
        try {
            Mac hmac512 = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), "HmacSHA512");
            hmac512.init(secretKey);
            byte[] hash = hmac512.doFinal(data.getBytes());
            return Hex.encodeHexString(hash);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to calculate hmac-sha512", ex);
        }
    }

    @Override
    public int queryPayment(VNPay vnPay) {

        String vnp_Version = "2.1.0";
        String vnp_Command = "querydr";
        String vnp_RequestId = getRandomNumber(8);
        String vnp_TmnCode = vnpayConfig.getVnp_TmnCode();
        String vnp_TxnRef = vnPay.getTxnRef();
        String vnp_OrderInfo ="Check order" + vnp_RequestId;
        String vnp_TransactionDate = vnPay.getTransactionDate();
        String vnp_IpAddr = "127.0.0.1";

        // Định dạng ngày giờ hiện tại
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        formatter.setTimeZone(TimeZone.getTimeZone("GMT+7"));
        String vnp_CreateDate = formatter.format(new Date());

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.put("vnp_TransactionDate", vnp_TransactionDate);
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
        vnp_Params.put("vnp_RequestId", vnp_RequestId);

        StringBuilder data = new StringBuilder();
        data.append(vnp_RequestId).append("|")
                .append(vnp_Version).append("|")
                .append(vnp_Command).append("|")
                .append(vnp_TmnCode).append("|")
                .append(vnp_TxnRef).append("|")
                .append(vnp_TransactionDate).append("|")
                .append(vnp_CreateDate).append("|")
                .append(vnp_IpAddr).append("|")
                .append(vnp_OrderInfo);

        String vnp_SecureHash = hmacSHA512(vnpayConfig.getVnp_HashSecret(), data.toString());
        vnp_Params.put("vnp_SecureHash", vnp_SecureHash);

        // Send request to VNPay
        RestTemplate restTemplate = new RestTemplate();
        String vnp_Url = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";
        try {
            PaymentQueryResponse response = restTemplate.postForObject(vnp_Url, vnp_Params, PaymentQueryResponse.class);
            if (!response.getVnp_ResponseCode().equals("00")) return -1;
            vnPay.setQueried(true);
            vnPayRepository.save(vnPay);
            if (response.getVnp_TransactionStatus().equals("00")) {
                return 1;
            }
            return 0;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public boolean checkReturnUrl(Map<String, String> params) {
        if (!params.containsKey("vnp_SecureHash")) return false;
        String receivedHash =   params.remove("vnp_SecureHash");

        List<String> fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        try {
            for (String fieldName : fieldNames) {
                String fieldValue = params.get(fieldName);
                if ((fieldValue != null) && (fieldValue.length() > 0)) {
                    if (hashData.length() > 0) {
                        hashData.append('&');
                    }
                    hashData.append(fieldName);
                    hashData.append('=');
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                }
            }
            String checkHash = hmacSHA512(vnpayConfig.getVnp_HashSecret(), hashData.toString());
//            System.out.println(checkHash);
//            System.out.println(receivedHash);
            return receivedHash.equals(checkHash);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
