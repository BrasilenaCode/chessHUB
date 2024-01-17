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

// controller per i servizi dei tornei
@RestController
@CrossOrigin(value = "http://localhost:4200/", allowCredentials = "true")
public class TorneiController {
    // chiamata per ottenere un torneo dato l'id
    @PostMapping("/tornei/id")
    public Torneo dammiTorneo(@RequestBody int id){
        return DBManager.getInstance().getTorneoDao().findByPrimaryKey(id);
    }
    // chiamata per ottenere tutti i tornei
    @GetMapping("/tornei/all")
    public List<Torneo> dammiTornei(){
        return DBManager.getInstance().getTorneoDao().findAll();
    }
    // chiamata per ottenere i tornei tramite il nome
    @PostMapping("/tornei/nome")
    public List<Torneo> dammiTorneiNome(@RequestBody String body) {
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getNome().equals(body)).toList();
    }
    // chiamata per ottenere i tornei in cui ha partecipato un giocatore
    @PostMapping("/tornei/giocatore")
    public List<Torneo> dammiTorneiGiocatore(@RequestBody String body) {
        Utente utente = DBManager.getInstance().getUtenteDao().findByPrimaryKey(body);
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> partita.getGiocatore1().equals(utente) || partita.getGiocatore2().equals(utente)).map(Partita::getTorneo).distinct().toList();
    }
    // chiamata per ottenere i tornei tramite la data di inizio
    @PostMapping("/tornei/dataInizio")
    public List<Torneo> dammiTorneiDataInizio(@RequestBody String body) {
        try {
            Date date = new SimpleDateFormat("yyyy-MM-dd").parse(body);
            return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getDataInizio().toInstant().equals(date.toInstant())).toList();
        } catch (ParseException e) {
            return new ArrayList<>();
        }
    }
    // chiamata per ottenere i tornei tramite la data di fine
    @PostMapping("/tornei/dataFine")
    public List<Torneo> dammiTorneiDataFine(@RequestBody String body) {
        try {
            Date date = new SimpleDateFormat("yyyy-MM-dd").parse(body);
            return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getDataFine().toInstant().equals(date.toInstant())).toList();
        } catch (ParseException e) {
            return new ArrayList<>();
        }
    }
    // chiamata per ottenere i tornei tramite il luogo
    @PostMapping("/tornei/luogo")
    public List<Torneo> dammiTorneiLuogo(@RequestBody String body) {
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getLuogo().equals(body)).toList();
    }
    // chiamata per ottenere i tornei per lo stato
    @PostMapping("/tornei/stato")
    public List<Torneo> dammiTorneiStato(@RequestBody String body) {
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getStato().equals(body)).toList();
    }
    // chiamata per ottenere i tornei il cui numero di partecipanti è maggiore di un certo numero
    @PostMapping("/tornei/numeroPartecipantiMaggiore")
    public List<Torneo> dammiTorneiConPiuPartecipanti(@RequestBody String body) {
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getNumeroPartecipanti() > Integer.parseInt(body)).toList();
    }
    // chiamata per ottenere i tornei il cui numero di partecipanti è minore di un certo numero
    @PostMapping("/tornei/numeroPartecipantiMinore")
    public List<Torneo> dammiTorneiConMenoPartecipanti(@RequestBody String body) {
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getNumeroPartecipanti() < Integer.parseInt(body)).toList();
    }
    // chiamata per ottenere i tornei il cui numero di partecipanti è uguale a un certo numero
    @PostMapping("/tornei/numeroPartecipantiUguale")
    public List<Torneo> dammiTorneiConEsattamentePartecipanti(@RequestBody String body) {
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getNumeroPartecipanti() == Integer.parseInt(body)).toList();
    }
    // chiamata per ottenere i tornei il cui vincitore è un certo utente
    @PostMapping("/tornei/vincitore")
    public List<Torneo> dammiTorneiVincitore(@RequestBody String body) {
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getVincitore().equals(DBManager.getInstance().getUtenteDao().findByPrimaryKey(body))).toList();
    }
    // chiamata per aggiungere un torneo
    @PostMapping("/tornei/add")
    public void aggiungiTorneo(@RequestBody Torneo torneo){
        DBManager.getInstance().getTorneoDao().saveOrUpdate(torneo);
    }
    // chiamata per cercare un torneo
    @PostMapping("/tornei/search")
    public List<Torneo> cercaTornei(@RequestBody String body){
        return DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getNome().contains(body)).toList();
    }
    // chiamata per iscrivere un utente ad un torneo
    @PostMapping("/tornei/iscrivimi")
    public boolean aggiungiPartecipante(HttpServletRequest req, @RequestBody int torneoId){
        // se l'utente è autenticato
        if(Auth.isAuthenticated(req)){
            Utente utente = Auth.getUser(req);
            // prendo il torneo
            Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
            // salvo il partecipante nel torneo
            DBManager.getInstance().getTorneoDao().addPartecipante(torneo, utente);
            return true;
        }
        // se non ho potuto inserirlo, ritorno false
        return false;
    }
    // chiamata per disiscrivere un utente da un torneo
    @PostMapping("/tornei/disiscrivimi")
    public boolean rimuoviPartecipante(HttpServletRequest req, @RequestBody int torneoId){
        // se l'utente è autenticato
        if(Auth.isAuthenticated(req)){
            Utente utente = Auth.getUser(req);
            // prendo il torneo
            Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
            // rimuovo il partecipante dal torneo
            DBManager.getInstance().getTorneoDao().removePartecipante(torneo, utente);
            return true;
        }
        // se non ho potuto rimuoverlo, ritorno false
        return false;
    }
    // chiamata per ottenere se esistono delle partite in un torneo
    @PostMapping("/tornei/partite")
    public List<Partita> esistonoPartite(HttpServletRequest req, @RequestBody int torneoId){
        // prendo il torneo
        Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
        // restituisco le partite trovate nel torneo
        return torneo.trovaPartite();
    }
    // chiamata per iniziare un torneo
    @PostMapping("/tornei/genera")
    public List<Partita> generaTorneo(HttpServletRequest req, @RequestBody int torneoId){
        // se l'utente è autenticato e l'utente è un admin
        if(Auth.isAuthenticated(req) && Auth.getUser(req).isAdmin()){
            // prendo il torneo
            Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
            // setto lo stato del torneo a inCorso
            torneo.setStato("inCorso");
            // salvo il torneo
            DBManager.getInstance().getTorneoDao().saveOrUpdate(torneo);
            // genero le partite e le restituisco
            return torneo.generaPartite();
        }
        // se non ho potuto generare le partite, restituisco null
        return null;
    }
    // chiamata per chiudere un torneo
    @PostMapping("/tornei/chiudi")
    public boolean chiudiTorneo(HttpServletRequest req, @RequestBody int torneoId){
        // se l'utente è autenticato e l'utente è un admin
        if(Auth.isAuthenticated(req) && Auth.getUser(req).isAdmin()){
            // prendo il torneo
            Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
            // setto lo stato del torneo a concluso
            if (DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> partita.getTorneo().getId() == torneo.getId()).map(partita -> partita.getEsito().equals("0")).filter(esito -> esito == true).count() != 0){
                return false;
            }
            // calcolo il vincitore e lo setto nel torneo
            torneo.getPunteggi().entrySet().stream().max(Map.Entry.comparingByValue()).ifPresent(entry -> torneo.setVincitore(DBManager.getInstance().getUtenteDao().findByPrimaryKey(entry.getKey())));
            // setto lo stato del torneo a concluso
            torneo.setStato("passato");
            // salvo il torneo
            DBManager.getInstance().getTorneoDao().saveOrUpdate(torneo);
            return true;
        }
        // se non ho potuto chiudere il torneo, restituisco false
        return false;
    }
    // chiamata per ottenere i tornei in cui è iscritto un utente
    @PostMapping("/tornei/isIscritto")
    public boolean isIscritto(HttpServletRequest req, @RequestBody int torneoId){
        // se l'utente è autenticato
        if(Auth.isAuthenticated(req)){
            // prendo l'utente
            Utente utente = Auth.getUser(req);
            // prendo il torneo
            Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
            // restituisco se l'utente è iscritto al torneo
            return torneo.getPartecipanti().contains(utente);
        }
        // se l'utente non è autenticato, restituisco false
        return false;
    }
    // chiamata per cercare i tornei
    @PostMapping("/tornei/ricerca")
    public List<List<Torneo>> trovaTornei(@RequestBody String string, HttpServletRequest req) {
        // matrice da inviare al frontend
        List<List<Torneo>> toSend = new ArrayList<>();
        TorneoDao dao = DBManager.getInstance().getTorneoDao();
        // aggiungo i tornei trovati tramite nome
        toSend.add(dao.tryToFindByName(string));
        // aggiungo i tornei trovati tramite luogo
        toSend.add(dao.tryToFindByLocation(string));
        // restituisco la matrice dei tornei
        return toSend;
    }
    // chiamata per aggiornare gli utenti a custom nei tornei
    @PostMapping("/tornei/aggiornaCustom")
    public boolean aggiornaCustom(HttpServletRequest req) {
        // se l'utente è autenticato
        if (Auth.isAuthenticated(req)) {
            // prendo l'utente
            Utente u=Auth.getUser(req);
            // prendo i tornei in cui è iscritto
            List<Torneo> tornei=DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getPartecipanti().contains(u)).toList();
            // se un torneo è in corso non posso aggiornarlo
            if(tornei.stream().filter(torneo -> torneo.getStato().equals("inCorso")).count() != 0)
                return false;
            // per ogni torneo a cui è iscritto
            for(Torneo torneo:tornei){
                // se il torneo è prossimo, rimuovo l'iscrizione
                if(torneo.getStato().equals("prossimo"))
                    DBManager.getInstance().getTorneoDao().removePartecipante(torneo, u);
                // altrimenti setto l'utente a custom
                else
                    DBManager.getInstance().getTorneoDao().aggiornaIscrizione(u);
            }
            // restituisco true
            return true;
        }
        // se l'utente non è autenticato, restituisco false
        return false;
    }
    // chiamata per ottenere gli utenti iscritti ad un torneo
    @PostMapping("/tornei/utentiTorneo")
    public List<Utente> dammiUtentiTorneo(@RequestBody int torneoId){
        // prendo il torneo
        Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
        // restituisco gli utenti iscritti al torneo, ordinati per punteggio
        List<Utente> utenti = torneo.getPartecipanti();
        Map<String, Integer> punteggi = torneo.getPunteggi();
        utenti.sort((o1, o2) -> punteggi.get(o1.getUsername()) > punteggi.get(o2.getUsername()) ? -1 : 1);
        return utenti;
    }
    // chiamata per ottenere i punteggi di un torneo
    @PostMapping("/tornei/punteggiTorneo")
    public Map<String, Integer> dammiPunteggiTorneo(@RequestBody int torneoId){
        // prendo il torneo
        Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
        // restituisco i punteggi del torneo
        return torneo.getPunteggi();
    }
}
