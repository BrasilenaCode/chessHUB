package it.brasilenacode.chesshub.controller;

import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import it.brasilenacode.chesshub.utilities.PartiteModel;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@CrossOrigin(value = "http://localhost:4200/", allowCredentials = "true")
public class ProfiloController {

    @PostMapping("/utenti/statistiche")
    @ResponseBody
    public List<Integer> ritornaStatistiche(HttpServletRequest req) {
        Utente u = Auth.getUser(req);
        Integer partiteVinte = PartiteModel.dammiPartiteVincitore(u.getUsername()).size();
        Integer partitePerse = PartiteModel.dammiPartitePerdente(u.getUsername()).size();
        Integer partitePatte = PartiteModel.dammiPartitepatte(u.getUsername()).size();
        Integer torneiVinti = DBManager.getInstance().
                getTorneoDao().findAll().stream()
                .filter(torneo -> torneo.getStato().equals("concluso") && (torneo.getVincitore()!=null && torneo.getVincitore().getUsername().equals(u.getUsername())))
                .toList().size();

        List<Integer> stats = new ArrayList<>();
        stats.add(partiteVinte);
        stats.add(partitePerse);
        stats.add(partitePatte);
        stats.add(torneiVinti);
        return stats;
    }
}
