package it.brasilenacode.chesshub.controller;

import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;

@RestController
@CrossOrigin(value = "http://localhost:4200", allowCredentials = "true")
public class Auth {

    private class AuthToken{

        String token;
        Utente utente;
        public Utente getUtente() {
            return utente;
        }

        public void setUtente(Utente utente) {
            this.utente = utente;
        }
        public String getToken() {
            return token;
        }
        public void setToken(String token) {
            this.token = token;
        }
    }
    @PostMapping("/login")
    public AuthToken login(@RequestBody Utente user, HttpServletRequest request) throws Exception {
        String username = user.getUsername();
        String password = user.getPassword();
        String concatenate = username + ":" + password;
        String token = base64encode(concatenate);
        user = getUserByToken(token);
        if (user != null){
            AuthToken auth = new AuthToken();
            auth.setToken(token);
            auth.setUtente(user);
            return auth;
        }
        return null;
    }

    @PostMapping("/signIn")
    public AuthToken registerUser(HttpServletRequest request, @RequestBody Utente user) {
        Utente tmpUser = DBManager.getInstance().getUtenteDao().findByPrimaryKey(user.getUsername());
        if (tmpUser == null) {
            String username = user.getUsername();
            String password = user.getPassword();
            String concatenate = username + ":" + password;
            String token = base64encode(concatenate);
            DBManager.getInstance().getUtenteDao().saveOrUpdate(user);
            AuthToken auth = new AuthToken();
            auth.setToken(token);
            auth.setUtente(user);
            return auth;
        }
        return null;
    }

    @PostMapping("/logout")
    public boolean logout(HttpServletRequest req) throws Exception{
        return true;
    }

    @PostMapping("/isAuthenticated")
    public static boolean isAuthenticated(HttpServletRequest req){
        String auth = req.getHeader("Authorization");
        if (auth != null) {
            String token = auth.substring("Basic ".length());
            return getUserByToken(token) != null;
        } else {
            return false;
        }
    }

    public static Utente getUserByToken(String token){
        if (token != null) {
            String decod = base64Decode(token);
            String username = decod.split(":")[0];
            String password = decod.split(":")[1];
            Utente utente = DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
            if (utente != null) {
                if (utente.getPassword().equals(password)) {
                    return utente;
                }
            }
        }
        return null;
    }

    private static String base64encode(String value){
        return Base64.getEncoder().encodeToString(value.getBytes());
    }

    private static String base64Decode(String value){
        return new String(Base64.getDecoder().decode(value.getBytes()));
    }

    public static Utente getUser(HttpServletRequest req) {
        String token=req.getHeader("Authorization").substring("Basic ".length());
        return getUserByToken(token);
    }
}
