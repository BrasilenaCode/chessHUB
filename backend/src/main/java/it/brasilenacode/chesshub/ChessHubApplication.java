package it.brasilenacode.chesshub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@ServletComponentScan
@SpringBootApplication
public class ChessHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChessHubApplication.class, args);
    }

}
