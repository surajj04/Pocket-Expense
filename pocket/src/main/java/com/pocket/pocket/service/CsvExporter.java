package com.pocket.pocket.service;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.pocket.pocket.model.UserExpenseData;

public class CsvExporter {
  public static String generateCSV(List<UserExpenseData> expenses) {
    StringWriter writer = new StringWriter();
    PrintWriter csvWriter = new PrintWriter(writer);

    csvWriter.println("Amount,Category,Date,Description,Gender,Name,DOB,UserId");

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    for (UserExpenseData expense : expenses) {
      csvWriter.println(String.join(",",
          String.valueOf(expense.getAmount()),
          expense.getCategory(),
          expense.getDate() != null ? expense.getDate().format(formatter) : "",
          expense.getDescription(),
          expense.getGender(),
          expense.getName(),
          expense.getDob() != null ? expense.getDob().format(formatter) : "",
          String.valueOf(expense.getUserId())));
    }
    csvWriter.flush();
    return writer.toString();
  }
}
