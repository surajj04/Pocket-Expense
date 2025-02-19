package com.pocket.pocket;

import java.util.Calendar;
import java.util.Date;

public class Demo {
    public static void main(String[] args) {
        Date date = new Date(15 - 10 - 2002);
        String result = getMonth(date);
        System.out.println(result);
    }

    public static String getMonth(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        int month = calendar.get(Calendar.MONTH);

        String[] months = {"Jan", "Feb", "March", "April", "May", "June",
                "July", "Aug", "Sept", "Oct", "Nov", "Dec"};

        return months[month];
    }
}
