package com.pocket.pocket.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pocket.pocket.model.Expense;
import com.pocket.pocket.model.User;
import com.pocket.pocket.model.UserExpenseData;

@Service
public class AdminServeice {

  @Autowired
  private UserService userService;
  @Autowired
  private ExpenseService expenseService;

  public List<UserExpenseData> getAllExpenseData() {

    List<UserExpenseData> list = new ArrayList();
    List<Expense> expenses = expenseService.getAllExpense();

    User temp = new User();

    int _id = 1;

    for (Expense expense : expenses) {
      UserExpenseData data = new UserExpenseData();
      data.setId(_id);
      data.setAmount(expense.getAmount());
      data.setCategory(expense.getCategory());
      data.setDate(expense.getDate().toString());
      data.setDescription(expense.getDescription());
      data.setUserId(expense.getUserId());

      temp = getDetail(expense.getUserId());

      if (temp.getGender() != null) {
        _id++;
        data.setGender(temp.getGender());
        data.setName(temp.getName());
        data.setDob(temp.getDob().toString());
        list.add(data);
      }
    }

    return list;
  }

  public User getDetail(int userId) {
    return userService.getUserDetail(userId);
  }

}
