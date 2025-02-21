package com.pocket.pocket;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import java.io.File;
import java.io.IOException;

public class Demo {
    public static void main(String[] args) throws IOException {
        File pdfFile = new File("uploads/PhonePe_Transaction_Statement.pdf");


        if (!pdfFile.exists()) {
            System.err.println("Error: PDF file not found at " + pdfFile.getAbsolutePath());
            return;
        }


        PDDocument document = Loader.loadPDF(pdfFile,"9356569013");
        PDFTextStripper pdfTextStripper = new PDFTextStripper();

        String extractedText = pdfTextStripper.getText(document);

        String[] lines = extractedText.split("\n");

        System.out.println("======= PhonePe Transaction Statement =======");
        for (String line : lines) {
            if (!line.trim().isEmpty()) { // Ignore empty lines
                System.out.println("| " + line.trim());
            }
        }
        System.out.println("=============================================");

        document.close();



    }
}
