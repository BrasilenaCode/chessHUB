package it.brasilenacode.chesshub.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import it.brasilenacode.chesshub.mail.MailManager;
import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import it.brasilenacode.chesshub.utilities.Pair;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import org.mindrot.jbcrypt.BCrypt;

import java.io.IOException;
import java.util.Base64;

// controller per i servizi di autenticazione
@RestController
// abilita le richieste da localhost:4200
@CrossOrigin(value = "http://localhost:4200", allowCredentials = "true")
public class Auth {

    // classe per il token di autenticazione
    private class AuthToken{
        String token;
        Utente utente;
        // getter e setter dei parametri
        public Utente getUtente() { return utente; }
        public void setUtente(Utente utente) { this.utente = utente; }
        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
    }
    // chiamata per il login
    @PostMapping("/login")
    public AuthToken login(@RequestBody Utente user, HttpServletRequest request) throws Exception {
        String username = user.getUsername();
        String password = user.getPassword();
        String concatenate = username + ":" + password;
        // genero il token
        String token = base64encode(concatenate);
        // prendo l'utente dal database, che corrisponde al tocken
        user = getUserByToken(token);
        if (user != null){
            // se l'utente esiste, creo un nuovo token e lo restituisco al frontend
            AuthToken auth = new AuthToken();
            auth.setToken(token);
            auth.setUtente(user);
            return auth;
        }
        // se non esiste l'utente restituisco null
        return null;
    }
    // chiamata per la registrazione
    @PostMapping("/signIn")
    public AuthToken registerUser(HttpServletRequest request, @RequestBody Utente user) {
        // controllo che non ci siano altri utenti con lo stesso username
        Utente tmpUser = DBManager.getInstance().getUtenteDao().findByPrimaryKey(user.getUsername());
        // se non esiste, creo un nuovo utente e un nuovo token
        if (tmpUser == null) {
            String username = user.getUsername();
            String password = user.getPassword();
            String concatenate = username + ":" + password;
            String token = base64encode(concatenate);
            // setto la password con l'hash di bcrypt
            user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
            DBManager.getInstance().getUtenteDao().saveOrUpdate(user);
            // creo il token e lo restituisco al frontend
            AuthToken auth = new AuthToken();
            auth.setToken(token);
            auth.setUtente(user);
            return auth;
        }
        // se esiste, restituisco null
        return null;
    }
    // chiamata per il logout
    @PostMapping("/logout")
    public static boolean logout(HttpServletRequest req) throws Exception{
        // restituiamo true per indicare che il logout è andato a buon fine
        return true;
    }
    // chiamata per controllare se l'utente è autenticato
    @PostMapping("/isAuthenticated")
    public static boolean isAuthenticated(HttpServletRequest req){
        // prendo l'header dell'autenticazione
        String auth = req.getHeader("Authorization");
        if (auth != null) {
            // se l'header non è null, prendo il token
            String token = auth.substring("Basic ".length());
            // restituisco true se l'utente esiste, false altrimenti
            return getUserByToken(token) != null;
        } else {
            // se l'header è null, restituisco false
            return false;
        }
    }

    // il frontend manda a questo endpoint un authcode e l'id associato ad esso
    // viene fatta una richiesta nel momento in cui l'utente è autenticato
    // ERGO vuole modificare i propri dati personali
    @PostMapping("/verify/authcode/authenticated")
    public static String verifyAuthCodeWhenAuthenticated(@RequestBody String pair, HttpServletRequest req) {
        if (isAuthenticated(req)) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                JsonNode node = objectMapper.readTree(pair);
                String uuid = node.get("id").asText();
                String code = node.get("code").asText();
                return MailManager.getInstance().isAuthCodeCorrect(uuid, code);
            } catch (IOException e) {
                System.out.println("ERROR READING THE JSON FOR AUTHCODE.");
                e.printStackTrace();
            }
        }
        return "";
    }

    // il frontend manda a questo endpoint un authcode e l'id associato ad esso
    // viene fatta una richiesta nel momento in cui l'utente non è autenticato
    // ERGO vuole registrarsi al sito
    @PostMapping("/verify/authcode/notauthenticated")
    public static String verifyAuthCodeWhenRegistering(@RequestBody String pair) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode node = objectMapper.readTree(pair);
            String uuid = node.get("id").asText();
            String code = node.get("code").asText();
            return MailManager.getInstance().isAuthCodeCorrect(uuid, code);
        } catch (IOException e) {
            System.out.println("ERROR READING THE JSON FOR AUTHCODE.");
            e.printStackTrace();
            return "";
        }
    }

    // da questo endpoint, il frontend riceve l'id associato all'authcode che l'utente dovrà inserire
    // (authcode che viene mandato alla mail dell'utente)
    @PostMapping("/authcode")
    public String sendAuthCode(@RequestBody String json) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode node = objectMapper.readTree(json);
            String inputUuid = node.get("id").asText();
            MailManager.getInstance().deleteAuth(inputUuid);
            String mail = node.get("mail").asText();
            String uuid = MailManager.getInstance().getUuid();
            boolean mailSent = MailManager.getInstance().send(mail, uuid);
            return (mailSent)? uuid : "errore";
        } catch (JsonProcessingException e) {
            System.out.println("ERROR TRYING TO READ JSON.");
            e.printStackTrace();
            return "errore";
        }
    }

    // metodo per prendere l'utente dal token
    public static Utente getUserByToken(String token){
        // decodifico il token, se esiste
        if (token != null) {
            String decod = base64Decode(token);
            String username = decod.split(":")[0];
            String password = decod.split(":")[1];
            // prendo l'utente dal database
            Utente utente = DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
            if (utente != null) {
                // controllo che la password sia corretta, se l'utente esiste
                if(BCrypt.checkpw(password, utente.getPassword())) {
                    // se la password è corretta, restituisco l'utente
                    return utente;
                }
            }
        }
        // se l'utente non esiste o la password non è corretta, restituisco null
        return null;
    }
    // metodo per codificare il token
    private static String base64encode(String value){
        return Base64.getEncoder().encodeToString(value.getBytes());
    }
    // metodo per decodificare il token
    private static String base64Decode(String value){
        return new String(Base64.getDecoder().decode(value.getBytes()));
    }
    // metodo per prendere l'utente dalla richiesta
    public static Utente getUser(HttpServletRequest req) {
        // prendo il token dalla richiesta
        String token = req.getHeader("Authorization").substring("Basic ".length());
        // restituisco l'utente dal token
        return getUserByToken(token);
    }
}
