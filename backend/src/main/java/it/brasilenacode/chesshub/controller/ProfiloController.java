package it.brasilenacode.chesshub.controller;

import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import it.brasilenacode.chesshub.utilities.PartiteModel;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

// controller per i servizi del profilo
@Controller
@CrossOrigin(value = "http://localhost:4200/", allowCredentials = "true")
public class ProfiloController {
    // chiamata per ottenere le statistiche di un utente
    @PostMapping("/utenti/statistiche")
    @ResponseBody
    public List<Integer> ritornaStatistiche(HttpServletRequest req) {
        // prendo l'utente che ha fatto la richiesta
        Utente u = Auth.getUser(req);
        // calcolo le statistiche
        Integer partiteVinte = PartiteModel.dammiPartiteVincitore(u.getUsername()).size();
        Integer partitePerse = PartiteModel.dammiPartitePerdente(u.getUsername()).size();
        Integer partitePatte = PartiteModel.dammiPartitepatte(u.getUsername()).size();
        Integer torneiVinti = DBManager.getInstance().
                getTorneoDao().findAll().stream()
                .filter(torneo -> torneo.getStato().equals("concluso") && (torneo.getVincitore()!=null && torneo.getVincitore().getUsername().equals(u.getUsername())))
                .toList().size();
        // ritorno le statistiche
        List<Integer> stats = new ArrayList<>();
        stats.add(partiteVinte);
        stats.add(partitePerse);
        stats.add(partitePatte);
        stats.add(torneiVinti);
        return stats;
    }
}
