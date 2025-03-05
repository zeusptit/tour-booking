package com.tourbooking.service;

import com.tourbooking.auth.Token;
import com.tourbooking.dto.Customer.CustomerDetailsDto;
import com.tourbooking.dto.Customer.CustomerStatisticsDto;
import com.tourbooking.dto.Customer.CustomerSummaryDto;
import com.tourbooking.model.Customers;
import com.tourbooking.model.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CustomerService {
    Customers addCustomers(CustomerDetailsDto customerDetailsDto, User user);
    CustomerSummaryDto getCustomerDtoByToken(Token token);
    CustomerSummaryDto editCustomerInfo(Token token, CustomerDetailsDto newCustomerDetailsDto);
    List<CustomerSummaryDto> getAllCustomers();
    CustomerSummaryDto getCustomerById(Long id);
    Page<CustomerSummaryDto> searchCustomers(String keyword, int page);
    CustomerStatisticsDto getCustomerStats();
    Customers getCustomerByToken(Token token);
}
