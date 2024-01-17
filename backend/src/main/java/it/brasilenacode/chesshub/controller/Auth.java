package it.brasilenacode.chesshub.controller;

import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.mindrot.jbcrypt.BCrypt;

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
