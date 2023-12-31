package it.brasilenacode.chesshub.controller;

import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Partita;
import it.brasilenacode.chesshub.persistenza.model.Torneo;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:4200/", allowCredentials = "true")
public class TorneiController {
    @PostMapping("/tornei/id")
    public Torneo dammiTorneo(@RequestBody int id){
        return DBManager.getInstance().getTorneoDao().findByPrimaryKey(id);
    }
    @GetMapping("/tornei/all")
    public List<Torneo> dammiTornei(){
        return DBManager.getInstance().getTorneoDao().findAll();
    }
    @PostMapping("/tornei/nome")
    public List<Torneo> dammiTorneiNome(@RequestBody String body) {
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getNome().equals(body)).toList();
    }
    @PostMapping("/tornei/giocatore")
    public List<Torneo> dammiTorneiGiocatore(@RequestBody String body) {
        Utente utente = DBManager.getInstance().getUtenteDao().findByPrimaryKey(body);
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> partita.getGiocatore1().equals(utente) || partita.getGiocatore2().equals(utente)).map(Partita::getTorneo).distinct().toList();
    }
    @PostMapping("/tornei/dataInizio")
    public List<Torneo> dammiTorneiDataInizio(@RequestBody String body) {
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getDataInizio().toInstant().equals(new Date(body).toInstant())).toList();
    }
    @PostMapping("/tornei/dataFine")
    public List<Torneo> dammiTorneiDataFine(@RequestBody String body) {
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getDataInizio().toInstant().equals(new Date(body).toInstant())).toList();
    }
    @PostMapping("/tornei/luogo")
    public List<Torneo> dammiTorneiLuogo(@RequestBody String body) {
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getLuogo().equals(body)).toList();
    }
    @PostMapping("/tornei/stato")
    public List<Torneo> dammiTorneiStato(@RequestBody String body) {
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getStato().equals(body)).toList();
    }
    @PostMapping("/tornei/numeroPartecipantiMaggiore")
    public List<Torneo> dammiTorneiConPiuPartecipanti(@RequestBody String body) {
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getNumeroPartecipanti() > Integer.parseInt(body)).toList();
    }
    @PostMapping("/tornei/numeroPartecipantiMinore")
    public List<Torneo> dammiTorneiConMenoPartecipanti(@RequestBody String body) {
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getNumeroPartecipanti() < Integer.parseInt(body)).toList();
    }
    @PostMapping("/tornei/numeroPartecipantiUguale")
    public List<Torneo> dammiTorneiConEsattamentePartecipanti(@RequestBody String body) {
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getNumeroPartecipanti() == Integer.parseInt(body)).toList();
    }
    @PostMapping("/tornei/vincitore")
    public List<Torneo> dammiTorneiVincitore(@RequestBody String body) {
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getVincitore().equals(DBManager.getInstance().getUtenteDao().findByPrimaryKey(body))).toList();
    }
    @PostMapping("/tornei/nuovo")
    public Torneo dammiNuovoTorneo(@RequestBody List<Utente> partecipanti){
        // todo: codice per generare il nuovo torneo
        return new Torneo();
    }
    @PostMapping("/tornei/add")
    public void aggiungiTorneo(@RequestBody Torneo torneo){
        DBManager.getInstance().getTorneoDao().saveOrUpdate(torneo);
    }
    @PostMapping("/tornei/search")
    public List<Torneo> cercaTornei(@RequestBody String body){
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getNome().contains(body)).toList();
    }
    @PostMapping("/tornei/iscrivimi")
    public boolean aggiungiPartecipante(HttpServletRequest req, @RequestBody int torneoId){
        if(Auth.isAuthenticated(req)){
            Utente utente = Auth.getUser(req);
            Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
            torneo.addPartecipante(utente);
            DBManager.getInstance().getTorneoDao().addPartecipante(torneo, utente);
            return true;
        }
        return false;
    }

    @PostMapping("/tornei/partite")
    public List<Partita> esistonoPartite(HttpServletRequest req, @RequestBody int torneoId){
        if(Auth.isAuthenticated(req)){
            Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
            return torneo.trovaPartite();
        }
        return null;
    }
    @PostMapping("/tornei/genera")
    public List<Partita> generaTorneo(HttpServletRequest req, @RequestBody int torneoId){
        if(Auth.isAuthenticated(req) && Auth.getUser(req).isAdmin()){
            Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
            return torneo.generaPartite();
        }
        return null;
    }
    @PostMapping("/tornei/isIscritto")
    public boolean isIscritto(HttpServletRequest req, @RequestBody int torneoId){
        if(Auth.isAuthenticated(req)){
            Utente utente = Auth.getUser(req);
            Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
            return torneo.getPartecipanti().contains(utente);
        }
        return false;
    }
}
