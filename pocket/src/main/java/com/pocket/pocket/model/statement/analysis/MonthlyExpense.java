package com.pocket.pocket.model.statement.analysis;

public class MonthlyExpense {
    private String month;
    private double food;
    private double travel;
    private double shopping;
    private double bills;
    private double entertainment;
    private double other;
    private double amount;


    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
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

    public double getEntertainment() {
        return entertainment;
    }

    public void setEntertainment(double entertainment) {
        this.entertainment = entertainment;
    }

    public double getOther() {
        return other;
    }

    public void setOther(double other) {
        this.other = other;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "MonthlyExpense{" +
                "month='" + month + '\'' +
                ", food=" + food +
                ", travel=" + travel +
                ", shopping=" + shopping +
                ", bills=" + bills +
                ", entertainment=" + entertainment +
                ", other=" + other +
                ", amount=" + amount +
                '}';
    }
}
