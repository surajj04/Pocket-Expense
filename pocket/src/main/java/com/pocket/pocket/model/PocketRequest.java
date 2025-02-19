package com.pocket.pocket.model;


public class PocketRequest {
    private int id;
    private int userId;
    private String name;
    private String upiId;
    private boolean status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUpiId() {
        return upiId;
    }

    public void setUpiId(String upiId) {
        this.upiId = upiId;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "PocketRequest{" +
                "id=" + id +
                ", userId=" + userId +
                ", name='" + name + '\'' +
                ", upiId='" + upiId + '\'' +
                ", status=" + status +
                '}';
    }
}
