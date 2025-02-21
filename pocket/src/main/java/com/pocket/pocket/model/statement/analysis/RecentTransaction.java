package com.pocket.pocket.model.statement.analysis;

public class RecentTransaction {
    private String name;
    private double amount;
    private String type;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "RecentTransaction{" +
                "name='" + name + '\'' +
                ", amount=" + amount +
                ", type='" + type + '\'' +
                '}';
    }
}
