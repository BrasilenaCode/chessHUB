package it.brasilenacode.chesshub.controller;

import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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
        System.out.println(username + " " + password);
        String concatenate = username + ":" + password;
        String token = base64encode(concatenate);
        AuthToken auth=new AuthToken();
        auth.setToken(token);
        return auth;
    }

    @PostMapping("/logout")
    public boolean logout(@RequestBody Utente utente, HttpServletRequest req) throws Exception{
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

    private static Utente getUserByToken(String token){
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

    protected static String base64encode(String value){
        return Base64.getEncoder().encodeToString(value.getBytes());
    }

    private static String base64Decode(String value){
        return new String(Base64.getDecoder().decode(value.getBytes()));
    }
}
