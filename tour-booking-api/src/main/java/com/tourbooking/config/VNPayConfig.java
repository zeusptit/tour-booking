package com.tourbooking.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;


@Configuration
@Getter
@Setter
public class VNPayConfig {
    @Value("${vnpay.tmnCode}")
    private String vnp_TmnCode;

    @Value("${vnpay.hashSecret}")
    private String vnp_HashSecret;

    @Value("${vnpay.apiUrl}")
    private String vnp_Url;

    @Value("${vnpay.queryUrl}")
    private String vnp_QueryUrl;

    @Value("${vnpay.returnUrl}")
    private String vnp_Returnurl;

}
