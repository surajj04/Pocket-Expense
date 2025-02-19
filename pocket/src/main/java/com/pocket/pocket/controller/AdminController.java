package com.pocket.pocket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pocket.pocket.model.UserExpenseData;
import com.pocket.pocket.service.AdminService;
import com.pocket.pocket.service.CsvExporter;

@RestController
public class AdminController {

  @Autowired
  private AdminService adminServeice;

  @GetMapping("/expense-data")
  public List<UserExpenseData> getAllExpenseData() {
    return adminServeice.getAllExpenseData();
  }

  @GetMapping("/api/download-expenses")
  public ResponseEntity<String> downloadExpenses() {
    try {
      List<UserExpenseData> expenses = adminServeice.getAllExpenseData();
      String csvContent = CsvExporter.generateCSV(expenses);
      HttpHeaders headers = new HttpHeaders();
      headers.add("Content-Disposition", "attachment; filename=expenses.csv");
      return new ResponseEntity<>(csvContent, headers, HttpStatus.OK);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("Error generating the CSV file: " + e.getMessage());
    }
  }
}
