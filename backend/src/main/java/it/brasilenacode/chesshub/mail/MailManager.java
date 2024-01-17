package it.brasilenacode.chesshub.mail;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import it.brasilenacode.chesshub.utilities.Pair;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class MailManager {

    private static MailManager instance = new MailManager();

    private Properties properties;

    private Session session;

    private Map<String, Pair> authCodes;    // mappa contenente le coppie <ID del authCode, <authCode, numTentativi>

    /* MESSAGGI PREDEFINITI PER SPEDIRE L'AUTHCODE */
    private final String subject = "Autenticazione";

    private final String toSendForAuth = "Gentile utente, \n\nIl codice di verifica per " +
            "portare a termine l'operazione è il seguente:\n\n";


    private MailManager() {
        init();
    }

    public static MailManager getInstance() {
        return instance;
    }

    // inizializza le proprietà per poter mandare le mail
    // e istanzia una nuova sessione, tramite le credenziali di accesso della mail con cui vengono mandati
    // i messaggi
    private void init() {
        this.authCodes = new HashMap<>();
        properties = System.getProperties();
        properties.setProperty("mail.smtp.host", MailSettings.notifierSMTP);
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.port", "587");

        session = Session.getDefaultInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(MailSettings.notifierMail, MailSettings.notifierPswd);
            }
        });
    }

    // crea una mail, settando tutti i parametri del caso, e prova a spedire
    public boolean send(String dest, String uuid) {
        try {

            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(MailSettings.notifierMail));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(dest));
            message.setSubject(subject);
            message.setText(toSendForAuth + this.authCodes.get(uuid).getFirst());
            Transport.send(message);

        } catch (MessagingException e) {
            System.out.println("ERROR SENDING THE EMAIL.");
            e.printStackTrace();
            return false;
        }
        return true;
    }

    /*
    sostanzialmente:
    genero un id del codice (UUID), nel caso esista già nella mappa lo rigenera.
    genero un authCode e dichiaro un oggetto Pair(authCode, tentativi) settando i tentativi a 0.
    inserisco il pair per tracciare l'authCode nella mappa authCodes.
    ritorno l'id del codice.
     */
    private String setAuthCodeAndGetUuid() {
        Random random = new Random();
        String uuid = UUID.randomUUID().toString();
        while (this.authCodes.containsKey(uuid)) {
            uuid = UUID.randomUUID().toString();
        }
        String authCode = Integer.toString(random.nextInt(9000) + 1000);
        Pair pair = new Pair(authCode, 1);
        this.authCodes.put(uuid, pair);
        return uuid;
    }

    // restituisce l'authCode al controller, che poi lo rispedirà al frontend
    public String getUuid() {
        String uuid = setAuthCodeAndGetUuid();
        return uuid;
    }

    /*
    verifica che l'authcode rimandato indietro dal frontend sia corretto.
    sostanzialmente:
    se la mappa non contiene come chiave l'id del codice ritorna "errore" ERGO non esiste nessun id corrispondente.
    se si ha una corrispondenza, controlla che il codice sia uguale e ritorna "corretto".
    altrimenti controlla a che tentativo è arrivato l'utente: i primi tre tentativi ritornano la "sbagliato",
    dopodiché torna "rimosso".
    in entrambi i casi (se il codice è corretto o se il numero massimo di tentativi è stato raggiunto) l'elemento
    relativo all'authCode viene eliminato dalla mappa, e l'utente dovrà richiedere un nuovo codice.
     */
    public String isAuthCodeCorrect(String uuid, String authCode) {
        if (this.authCodes.containsKey(uuid)) {
            Pair tmp = this.authCodes.get(uuid);
            if(tmp.getFirst().equals(authCode)) {
                this.authCodes.remove(uuid);
                return "corretto";
            } else {
                Integer tries = tmp.getSecond();
                if (tries <= 3) {
                    tmp.setSecond(tmp.getSecond() + 1);
                    return "sbagliato";
                }
                else {
                    this.authCodes.remove(uuid);
                    return "rimosso";
                }
            }
        }
        return "errore";
    }

    // chiusura del servizio mail
    public void close() {
        if (session != null) {
            session.getProperties().clear();
            session = null;
        }
    }

}
