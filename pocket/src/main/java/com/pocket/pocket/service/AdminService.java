package com.pocket.pocket.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pocket.pocket.model.Expense;
import com.pocket.pocket.model.User;
import com.pocket.pocket.model.UserExpenseData;

@Service
public class AdminService {

  @Autowired
  private UserService userService;
  @Autowired
  private ExpenseService expenseService;

  public List<UserExpenseData> getAllExpenseData() {
    List<UserExpenseData> list = new ArrayList<>();
    List<Expense> expenses = expenseService.getAllExpense();

    for (Expense expense : expenses) {
      UserExpenseData data = new UserExpenseData();
      data.setAmount(expense.getAmount());
      data.setCategory(expense.getCategory());

      // Convert java.util.Date to java.time.LocalDate
      if (expense.getDate() != null) {
        data.setDate(convertToLocalDate(expense.getDate()));
      }

      data.setDescription(expense.getDescription());
      data.setUserId(expense.getUserId());

      User user = getDetail(expense.getUserId());

      if (user != null && user.getGender() != null) {
        data.setGender(user.getGender());
        data.setName(user.getName());

        // Convert java.util.Date to java.time.LocalDate for DOB
        if (user.getDob() != null) {
          data.setDob(convertToLocalDate(user.getDob()));
        }

        list.add(data);
      }
    }

    return list;
  }

  public User getDetail(int userId) {
    return userService.getUserDetail(userId);
  }

  // Utility method to convert java.util.Date to java.time.LocalDate
  private LocalDate convertToLocalDate(java.util.Date date) {
    return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
  }
}
