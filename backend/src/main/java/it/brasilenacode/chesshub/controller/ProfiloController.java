package it.brasilenacode.chesshub.controller;

import it.brasilenacode.chesshub.persistenza.DAO.PartitaDao;
import it.brasilenacode.chesshub.persistenza.DAO.TorneoDao;
import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Partita;
import it.brasilenacode.chesshub.persistenza.model.Torneo;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import it.brasilenacode.chesshub.utilities.PartiteModel;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
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

    @PostMapping("/utenti/statistiche")
    @ResponseBody
    public List<Integer> ritornaStatistiche(HttpServletRequest req) {
        Utente u = Auth.getUser(req);
        Integer partiteVinte = PartiteModel.dammiPartiteVincitore(u.getUsername()).size();
        Integer partitePerse = PartiteModel.dammiPartitePerdente(u.getUsername()).size();
        Integer partitePatte = PartiteModel.dammiPartitepatte(u.getUsername()).size();
        TorneoDao torneoDao = DBManager.getInstance().getTorneoDao();
        List<Torneo> torneiVinti = DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getStato().equals("concluso")).toList();
        Integer tornei = 0;
        for (Torneo t : torneiVinti) {
            if (t.getVincitore().equals(u.getUsername()))
                tornei++;
        }
        List<Integer> stats = new ArrayList<>();
        stats.add(partiteVinte);
        stats.add(partitePerse);
        stats.add(partitePatte);
        stats.add(tornei);
        System.out.println("la size è " + stats.size());
        return stats;
    }
}
