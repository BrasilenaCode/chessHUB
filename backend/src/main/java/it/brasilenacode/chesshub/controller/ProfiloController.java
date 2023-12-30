package it.brasilenacode.chesshub.controller;

import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Partita;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import it.brasilenacode.chesshub.utilities.PartiteModel;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(value = "http://localhost:4200/", allowCredentials = "true")
public class ProfiloController {

    @PostMapping("/utenti/profilo")
    public String ritornaPaginaProfilo(HttpServletRequest req, @RequestBody Utente u) {
        List<Partita> p = PartiteModel.dammiPartiteGiocate(u.getUsername());
        p.sort((o1, o2) -> o2.getData().compareTo(o1.getData()));
        req.setAttribute("utente", u);
        req.setAttribute("partiteGiocate", p);
        return "profilo";
    }
}
