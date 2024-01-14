package it.brasilenacode.chesshub.controller;

import it.brasilenacode.chesshub.persistenza.DAO.TorneoDao;
import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Partita;
import it.brasilenacode.chesshub.persistenza.model.Torneo;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.text.ParseException;
import java.text.SimpleDateFormat;

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
        try {
            Date date = new SimpleDateFormat("yyyy-MM-dd").parse(body);
            return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getDataInizio().toInstant().equals(date.toInstant())).toList();
        } catch (ParseException e) {
            // Handle the parse exception
            return new ArrayList<>();
        }
    }

    @PostMapping("/tornei/dataFine")
    public List<Torneo> dammiTorneiDataFine(@RequestBody String body) {
        try {
            Date date = new SimpleDateFormat("yyyy-MM-dd").parse(body);
            return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getDataFine().toInstant().equals(date.toInstant())).toList();
        } catch (ParseException e) {
            return new ArrayList<>();
        }
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

    @PostMapping("/tornei/disiscrivimi")
    public boolean rimuoviPartecipante(HttpServletRequest req, @RequestBody int torneoId){
        if(Auth.isAuthenticated(req)){
            Utente utente = Auth.getUser(req);
            Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
            torneo.removePartecipante(utente);
            DBManager.getInstance().getTorneoDao().removePartecipante(torneo, utente);
            return true;
        }
        return false;
    }

    @PostMapping("/tornei/partite")
    public List<Partita> esistonoPartite(HttpServletRequest req, @RequestBody int torneoId){
        Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
        return torneo.trovaPartite();
    }
    @PostMapping("/tornei/genera")
    public List<Partita> generaTorneo(HttpServletRequest req, @RequestBody int torneoId){
        if(Auth.isAuthenticated(req) && Auth.getUser(req).isAdmin()){
            Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
            torneo.setStato("inCorso");
            DBManager.getInstance().getTorneoDao().saveOrUpdate(torneo);
            return torneo.generaPartite();
        }
        return null;
    }
    @PostMapping("/tornei/chiudi")
    public boolean chiudiTorneo(HttpServletRequest req, @RequestBody int torneoId){
        if(Auth.isAuthenticated(req) && Auth.getUser(req).isAdmin()){
            Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
            
            if (DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> partita.getTorneo().getId() == torneo.getId()).map(partita -> partita.getEsito().equals("0")).filter(esito -> esito == true).count() != 0){
                return false;
            }
            torneo.setStato("passato");
            DBManager.getInstance().getTorneoDao().saveOrUpdate(torneo);
            return true;
        }
        return false;
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

    @PostMapping("/tornei/ricerca")
    public List<List<Torneo>> trovaTornei(@RequestBody String string, HttpServletRequest req) {
        List<List<Torneo>> toSend = new ArrayList<>();
        TorneoDao dao = DBManager.getInstance().getTorneoDao();
        toSend.add(dao.tryToFindByName(string));
        toSend.add(dao.tryToFindByLocation(string));
        return toSend;
    }

    @PostMapping("/tornei/aggiornaCustom")
    public void aggiornaCustom(HttpServletRequest req) {
        if (Auth.isAuthenticated(req)) {
            DBManager.getInstance().getTorneoDao().aggiornaIscrizione(Auth.getUser(req));
        }
    }
    @PostMapping("/tornei/utentiTorneo")
    public List<Utente> dammiUtentiTorneo(@RequestBody int torneoId){
        Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
        List<Utente> utenti = torneo.getPartecipanti();
        Map<String, Integer> punteggi = torneo.getPunteggi();
        utenti.sort((o1, o2) -> punteggi.get(o1.getUsername()) > punteggi.get(o2.getUsername()) ? -1 : 1);
        return utenti;
    }

}
