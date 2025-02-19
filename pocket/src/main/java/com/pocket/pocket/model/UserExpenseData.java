package com.pocket.pocket.model;

import java.time.LocalDate;

public class UserExpenseData {
  private double amount;
  private String category;
  private LocalDate date; // Use LocalDate instead of java.sql.Date
  private String description;
  private String gender;
  private String name;
  private LocalDate dob; // Use LocalDate instead of java.sql.Date
  private int userId;

  // Default constructor
  public UserExpenseData() {
  }

  // Parameterized constructor
  public UserExpenseData(double amount, String category, LocalDate date, String description,
      String gender, String name, LocalDate dob, int userId) {
    this.amount = amount;
    this.category = category;
    this.date = date;
    this.description = description;
    this.gender = gender;
    this.name = name;
    this.dob = dob;
    this.userId = userId;
  }

  public double getAmount() {
    return amount;
  }

  public void setAmount(double amount) {
    this.amount = amount;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getGender() {
    return gender;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public LocalDate getDob() {
    return dob;
  }

  public void setDob(LocalDate dob) {
    this.dob = dob;
  }

  public int getUserId() {
    return userId;
  }

  public void setUserId(int userId) {
    this.userId = userId;
  }

  // toString method
  @Override
  public String toString() {
    return "UserExpenseData{" +
        ", amount=" + amount +
        ", category='" + category + '\'' +
        ", date=" + date +
        ", description='" + description + '\'' +
        ", gender='" + gender + '\'' +
        ", name='" + name + '\'' +
        ", dob=" + dob +
        ", userId=" + userId +
        '}';
  }
}
