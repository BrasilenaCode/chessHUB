package it.brasilenacode.chesshub;

import it.brasilenacode.chesshub.application.mail.MailManager;
import it.brasilenacode.chesshub.persistenza.DBManager;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@ServletComponentScan
@SpringBootApplication
public class ChessHubApplication {

    public static void main(String[] args) {
        // per chiudere il servizio di mail
        // la funzione close() verrà chiamata alla chiusura del server
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            MailManager.getInstance().close();
        }));
        // avvio dell'applicazione
        SpringApplication.run(ChessHubApplication.class, args);
        // creazione dell'utente, del torneo e della partita di prova
        DBManager.getInstance().createGuest();
    }
}
