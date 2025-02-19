package com.pocket.pocket.model;

public class Report {
    private String id;
    private String month;
    private double amount;
    private double food;
    private double travel;
    private double shopping;
    private double bills;
    private double other;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getFood() {
        return food;
    }

    public void setFood(double food) {
        this.food = food;
    }

    public double getTravel() {
        return travel;
    }

    public void setTravel(double travel) {
        this.travel = travel;
    }

    public double getShopping() {
        return shopping;
    }

    public void setShopping(double shopping) {
        this.shopping = shopping;
    }

    public double getBills() {
        return bills;
    }

    public void setBills(double bills) {
        this.bills = bills;
    }

    public double getOther() {
        return other;
    }

    public void setOther(double other) {
        this.other = other;
    }

    @Override
    public String toString() {
        return "Report{" +
                "id='" + id + '\'' +
                ", month='" + month + '\'' +
                ", amount=" + amount +
                ", food=" + food +
                ", travel=" + travel +
                ", shopping=" + shopping +
                ", bills=" + bills +
                ", other=" + other +
                '}';
    }
}
