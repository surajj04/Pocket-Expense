package com.pocket.pocket.model.statement.analysis;

import java.util.List;

public class StatementAnalysis {
    // summary of transactions
    private double totalCredit;
    private double totalDebit;

    // monthly expense breakdown
    private List<MonthlyExpense> monthlyExpenses;

    // top spending
    private List<TopSpending> topSpendings;

    // merchant insights
    private List<MerchantInsights> merchantInsights;

    // refund & failed transactions
    private List<RefundFailed> refundFaileds;

    // spending trends
    private List<DailyTrends> dailyTrends;

    // recent transactions
    private List<RecentTransaction> recentTransactions;

    private List<HighValueTransaction> highValueTransactions;

    public double getTotalCredit() {
        return totalCredit;
    }

    public void setTotalCredit(double totalCredit) {
        this.totalCredit = totalCredit;
    }

    public double getTotalDebit() {
        return totalDebit;
    }

    public void setTotalDebit(double totalDebit) {
        this.totalDebit = totalDebit;
    }

    public List<MonthlyExpense> getMonthlyExpenses() {
        return monthlyExpenses;
    }

    public void setMonthlyExpenses(List<MonthlyExpense> monthlyExpenses) {
        this.monthlyExpenses = monthlyExpenses;
    }

    public List<TopSpending> getTopSpendings() {
        return topSpendings;
    }

    public void setTopSpendings(List<TopSpending> topSpendings) {
        this.topSpendings = topSpendings;
    }

    public List<MerchantInsights> getMerchantInsights() {
        return merchantInsights;
    }

    public void setMerchantInsights(List<MerchantInsights> merchantInsights) {
        this.merchantInsights = merchantInsights;
    }

    public List<RefundFailed> getRefundFaileds() {
        return refundFaileds;
    }

    public void setRefundFaileds(List<RefundFailed> refundFaileds) {
        this.refundFaileds = refundFaileds;
    }

    public List<DailyTrends> getDailyTrends() {
        return dailyTrends;
    }

    public void setDailyTrends(List<DailyTrends> dailyTrends) {
        this.dailyTrends = dailyTrends;
    }

    public List<RecentTransaction> getRecentTransactions() {
        return recentTransactions;
    }

    public void setRecentTransactions(List<RecentTransaction> recentTransactions) {
        this.recentTransactions = recentTransactions;
    }

    public List<HighValueTransaction> getHighValueTransactions() {
        return highValueTransactions;
    }

    public void setHighValueTransactions(List<HighValueTransaction> highValueTransactions) {
        this.highValueTransactions = highValueTransactions;
    }

    @Override
    public String toString() {
        return "StatementAnalysis{" +
                "credit=" + totalCredit +
                ", debit=" + totalDebit +
                ", monthlyExpenses=" + monthlyExpenses +
                ", topSpendings=" + topSpendings +
                ", merchantInsights=" + merchantInsights +
                ", refundFaileds=" + refundFaileds +
                ", dailyTrends=" + dailyTrends +
                ", recentTransactions=" + recentTransactions +
                ", highValueTransactions=" + highValueTransactions +
                '}';
    }
}
