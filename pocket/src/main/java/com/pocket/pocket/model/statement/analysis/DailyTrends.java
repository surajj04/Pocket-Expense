package com.pocket.pocket.model.statement.analysis;

public class DailyTrends {

    private String day;
    private double amount;

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "DailyTrends{" +
                "day='" + day + '\'' +
                ", amount=" + amount +
                '}';
    }
}
