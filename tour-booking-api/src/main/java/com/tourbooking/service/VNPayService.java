package com.tourbooking.service;

import com.tourbooking.model.Bookings;
import com.tourbooking.model.VNPay;

import java.util.Map;

public interface VNPayService {
    String createPayment(Bookings bookings);
    int queryPayment(VNPay vnPay);
    boolean checkReturnUrl(Map<String, String> params);
}
