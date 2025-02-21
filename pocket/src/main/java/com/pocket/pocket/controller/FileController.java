package com.pocket.pocket.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class FileController {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;

    public FileController(ChatClient.Builder builder, ObjectMapper objectMapper) {
        this.chatClient = builder.build();
        this.objectMapper = objectMapper;
    }

    @PostMapping("/extract")
    public String extractText(@RequestParam("file") MultipartFile file) {
        try {
            PDDocument document = Loader.loadPDF(file.getInputStream().readAllBytes());
            PDFTextStripper pdfTextStripper = new PDFTextStripper();
            String pdfTxt = pdfTextStripper.getText(document);
            document.close();
            return statementAnalysis(pdfTxt);
        } catch (Exception e) {
            System.err.println("Error processing PDF: " + e.getMessage());
            return null;
        }
    }

    private String statementAnalysis(String text) {
        String prompt = "Analyze the following Indian bank statement and return a structured JSON response."
                + " Categorize monthly expenses based on transaction descriptions. Use the following categories:\n"
                + "- **Food & Dining**: Zomato, Swiggy, McDonald's, Dominos, Restaurant payments\n"
                + "- **Shopping**: Amazon, Flipkart, Myntra, Ajio, TataCliq, Snapdeal, Electronics stores\n"
                + "- **Travel**: Ola, Uber, Train, Flight bookings, Petrol pump, Toll\n"
                + "- **Bills & Utilities**: Electricity, Water, Gas, Broadband, Mobile recharge, DTH\n"
                + "- **Entertainment**: Netflix, Hotstar, PVR, BookMyShow\n"
                + "- **Other**: Anything that doesn't fit the above\n"
                + "Also, return transaction trends grouped by weekdays (Monday–Sunday).\n"
                + "\n"
                + "Ensure the response strictly follows this JSON format:\n"
                + "```json\n"
                + "{"
                + "\"totalCredit\": 0.0,"
                + "\"totalDebit\": 0.0,"
                + "\"monthlyExpenses\": [{"
                + "\"month\": \"string\","
                + "\"food\": 0.0,"
                + "\"shopping\": 0.0,"
                + "\"travel\": 0.0,"
                + "\"bills\": 0.0,"
                + "\"entertainment\": 0.0,"
                + "\"other\": 0.0,"
                + "\"amount\": 0.0"
                + "}],"
                + "\"topSpendings\": [{\"category\": \"string\", \"amount\": 0.0}],"
                + "\"merchantInsights\": [{"
                + "\"merchant\": \"string\","
                + "\"totalSpent\": 0.0"
                + "}],"
                + "\"refundFaileds\": [{\"date\": \"string\", \"amount\": 0.0, \"status\": \"string\"}],"
                + "\"dailyTrends\": {"
                + "\"Monday\": {\"totalTransactions\": here calculate the total amount  user spent the money on monday of every  month},"
                + "\"Tuesday\": {\"totalTransactions\": here calculate the total amount  user spent the money on tuesday of every month},"
                + "\"Wednesday\": {\"totalTransactions\": here calculate the total amount  user spent the money on wednesday of every month},"
                + "\"Thursday\": {\"totalTransactions\": here calculate the total amount  user spent the money on thursday of every month},"
                + "\"Friday\": {\"totalTransactions\": here calculate the total amount  user spent the money on friday of every month},"
                + "\"Saturday\": {\"totalTransactions\": here calculate the total amount  user spent the money on saturday of every month},"
                + "\"Sunday\": {\"totalTransactions\": here calculate the total amount  user spent the money on sunday of every month}"
                + "},"
                + "\"recentTransactions\": [{"
                + "\"date\": \"string\","
                + "\"description\": \"string\","
                + "\"amount\": 0.0,"
                + "\"type\": \"string\""
                + "}],"
                + "\"highValueTransactions\": [{"
                + "\"date\": \"string\","
                + "\"amount\": 0.0,"
                + "\"description\": \"string\""
                + "}]"
                + "}\n"
                + "```\n"
                + "🚀 **Important Update:** Merchant Insights should include **ONLY online shopping platforms** based on transaction descriptions. "
                + "Consider platforms like Amazon, Flipkart, Myntra, Ajio, TataCliq, and Snapdeal."
                + "DO NOT include any explanation, only return the JSON.\n"
                + "Bank Statement: " + text;

        var result = chatClient
                .prompt()
                .user(prompt)
                .call()
                .content();

        return result;
    }
}
