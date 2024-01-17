package it.brasilenacode.chesshub;

import it.brasilenacode.chesshub.persistenza.DBManager;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@ServletComponentScan
@SpringBootApplication
public class ChessHubApplication {

    public static void main(String[] args) {
        // avvio dell'applicazione
        SpringApplication.run(ChessHubApplication.class, args);
        // creazione dell'utente, del torneo e della partita di prova
        DBManager.getInstance().createGuest();
    }
}
