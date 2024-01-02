package it.brasilenacode.chesshub.controller;

import it.brasilenacode.chesshub.persistenza.DAO.PartitaDao;
import it.brasilenacode.chesshub.persistenza.DAO.TorneoDao;
import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Partita;
import it.brasilenacode.chesshub.persistenza.model.Torneo;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import it.brasilenacode.chesshub.utilities.FlagDirector;
import it.brasilenacode.chesshub.utilities.PartiteModel;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Controller
@CrossOrigin(value = "http://localhost:4200/", allowCredentials = "true")
public class ProfiloController {

    @PostMapping("/utenti/profilo")
    public String ritornaPaginaProfilo(HttpServletRequest req, @RequestBody Utente u) {
        req.setAttribute("utente", u);
        req.setAttribute("bandiera", FlagDirector.getInstance().getFlag(u.getNazionalita()));
        return "profilo";
    }

    @PostMapping("/utenti/profiloPubblico")
    public String ritornaPaginaProfiloPubblico(HttpServletRequest req, @RequestBody String username) {
        Utente u = DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
        int eta = Period.between(u.getDataNascita().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(), LocalDate.now()).getYears();
        req.setAttribute("utente", u);
        req.setAttribute("eta", eta);
        return "profiloPubblico";
    }

    @PostMapping("/utenti/statistiche")
    @ResponseBody
    public List<Integer> ritornaStatistiche(HttpServletRequest req) {
        Utente u = Auth.getUser(req);
        Integer partiteVinte = PartiteModel.dammiPartiteVincitore(u.getUsername()).size();
        Integer partitePerse = PartiteModel.dammiPartitePerdente(u.getUsername()).size();
        Integer partitePatte = PartiteModel.dammiPartitepatte(u.getUsername()).size();
        TorneoDao torneoDao = DBManager.getInstance().getTorneoDao();
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
