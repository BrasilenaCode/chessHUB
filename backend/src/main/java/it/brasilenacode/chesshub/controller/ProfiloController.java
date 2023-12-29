package it.brasilenacode.chesshub.controller;

import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(value = "http://localhost:4200/", allowCredentials = "true")
public class ProfiloController {

    @PostMapping("/utenti/profilo")
    public String ciao(HttpServletRequest req, @RequestBody String body) {
        Utente u;
        if(Auth.isAuthenticated(req)){
            u = DBManager.getInstance().getUtenteDao().findByPrimaryKey(body);
        } else {
            u = null;
        }
        req.setAttribute("utente", u);
        return "utente";
    }
}
