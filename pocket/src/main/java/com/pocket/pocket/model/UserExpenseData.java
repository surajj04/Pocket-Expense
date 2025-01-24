package com.pocket.pocket.model;

public class UserExpenseData {

  private int id;
  private double amount;
  private String category;
  private String date;
  private String description;
  private String gender;
  private String name;
  private String dob;
  private int userId;

  // Default constructor
  public UserExpenseData() {
  }

  // Parameterized constructor
  public UserExpenseData(int id, double amount, String category, String date, String description,
      String gender, String name, String dob, int userId) {
    this.id = id;
    this.amount = amount;
    this.category = category;
    this.date = date;
    this.description = description;
    this.gender = gender;
    this.name = name;
    this.dob = dob;
    this.userId = userId;
  }

  // Getters and Setters
  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
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

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
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

  public String getDob() {
    return dob;
  }

  public void setDob(String dob) {
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
        "id=" + id +
        ", amount=" + amount +
        ", category='" + category + '\'' +
        ", date='" + date + '\'' +
        ", description='" + description + '\'' +
        ", gender='" + gender + '\'' +
        ", name='" + name + '\'' +
        ", dob='" + dob + '\'' +
        ", userId=" + userId +
        '}';
  }
}
