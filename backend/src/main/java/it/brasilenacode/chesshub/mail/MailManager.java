package it.brasilenacode.chesshub.mail;

import java.util.Properties;
import java.util.Random;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class MailManager {

    private static MailManager instance = new MailManager();

    private Properties properties;

    private Session session;

    private String authCode;

    private final String subject = "Autenticazione";

    private final String toSendForAuth = "Gentile utente, \n\nIl codice di verifica per " +
            "portare a termine l'operazione è il seguente:\n\n";


    private MailManager() {
        init();
    }

    public static MailManager getInstance() {
        return instance;
    }

    private void init() {
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

    public boolean send(String dest) {
        try {

            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(MailSettings.notifierMail));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(dest));
            message.setSubject(subject);
            message.setText(toSendForAuth + getAuthCode() );
            Transport.send(message);

        } catch (MessagingException e) {
            System.out.println("ERROR SENDING THE EMAIL.");
            e.printStackTrace();
            return false;
        }
        return true;
    }

    private void setAuthCode() {
        Random random = new Random();
        this.authCode = Integer.toString(random.nextInt(9000) + 1000);
    }

    public String getAuthCode() {
        setAuthCode();
        return authCode;
    }

    public boolean isAuthCodeCorrect(String authCode) {
        return this.authCode.equals(authCode);
    }

    public void close() throws Exception {
        if (session != null) {
            session.getProperties().clear();
            session = null;
        }
    }

}
