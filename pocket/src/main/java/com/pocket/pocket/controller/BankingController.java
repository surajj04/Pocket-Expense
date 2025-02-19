package com.pocket.pocket.controller;

import com.pocket.pocket.model.BankAccount;
import com.pocket.pocket.model.PocketRequest;
import com.pocket.pocket.model.Transaction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/client")
public class BankingController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/transactions/{upiId}")
    public List<Transaction> getAllTransaction(@PathVariable String upiId) {
        String url = "http://localhost:8081/pocket-transaction/"+upiId;
        Transaction[] transactions = restTemplate.getForObject(url, Transaction[].class);
        return transactions != null ? Arrays.asList(transactions) : List.of();
    }

    @PostMapping("/send-request")
    public ResponseEntity<Boolean> sendRequest(@RequestBody PocketRequest request) {
        String url = "http://localhost:8081/pocket-upi-request";
        try {
            Boolean response = restTemplate.postForObject(url, request, Boolean.class);
            return ResponseEntity.ok(Boolean.TRUE.equals(response));
        } catch (RestClientException e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }

    @GetMapping("/get-account/{userId}")
    public BankAccount getAccount(@PathVariable int userId) {
        String url = "http://localhost:8081/get-request/" + userId;
        return restTemplate.getForObject(url, BankAccount.class);
    }



}

