package it.brasilenacode.chesshub.controller;
import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Partita;
import it.brasilenacode.chesshub.persistenza.model.Torneo;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import it.brasilenacode.chesshub.application.TorneoModel;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

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
            TorneoModel.aggiungiPartecipante(Auth.getUser(req), torneoId);
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
            return TorneoModel.rimuoviPartecipante(Auth.getUser(req), torneoId);
        }
        // se non ho potuto rimuoverlo, ritorno false
        return false;
    }
    // chiamata per ottenere se esistono delle partite in un torneo
    @PostMapping("/tornei/partite")
    public List<Partita> esistonoPartite(HttpServletRequest req, @RequestBody int torneoId){
        // restituisco le partite trovate nel torneo
        return TorneoModel.trovaPartite(torneoId);
    }
    // chiamata per iniziare un torneo
    @PostMapping("/tornei/genera")
    public List<Partita> generaTorneo(HttpServletRequest req, @RequestBody int torneoId){
        // se l'utente è autenticato e l'utente è un admin
        if(Auth.isAuthenticated(req) && Auth.getUser(req).isAdmin()){
            return TorneoModel.generaPartite(torneoId);
        }
        // se non ho potuto generare le partite, restituisco null
        return null;
    }
    // chiamata per chiudere un torneo
    @PostMapping("/tornei/chiudi")
    public boolean chiudiTorneo(HttpServletRequest req, @RequestBody int torneoId){
        // se l'utente è autenticato e l'utente è un admin
        if(Auth.isAuthenticated(req) && Auth.getUser(req).isAdmin()){
            return TorneoModel.chiudiTorneo(torneoId);
        }
        // se non ho potuto chiudere il torneo, restituisco false
        return false;
    }
    // chiamata per ottenere i tornei in cui è iscritto un utente
    @PostMapping("/tornei/isIscritto")
    public boolean isIscritto(HttpServletRequest req, @RequestBody int torneoId){
        // se l'utente è autenticato
        if(Auth.isAuthenticated(req)){
            return TorneoModel.isIscritto(Auth.getUser(req), torneoId);
        }
        // se l'utente non è autenticato, restituisco false
        return false;
    }
    // chiamata per cercare i tornei
    @PostMapping("/tornei/ricerca")
    public List<List<Torneo>> trovaTornei(@RequestBody String string, HttpServletRequest req) {
        return TorneoModel.trovaTornei(string);
    }
    // chiamata per aggiornare gli utenti a custom nei tornei
    @PostMapping("/tornei/aggiornaCustom")
    public boolean aggiornaCustom(HttpServletRequest req) {
        // se l'utente è autenticato
        if (Auth.isAuthenticated(req)) {
           return TorneoModel.aggiornaCustom(Auth.getUser(req));
        }
        // se l'utente non è autenticato, restituisco false
        return false;
    }
    // chiamata per ottenere gli utenti iscritti ad un torneo
    @PostMapping("/tornei/utentiTorneo")
    public List<Utente> dammiUtentiTorneo(@RequestBody int torneoId){
        return TorneoModel.dammiUtentiTorneo(torneoId);
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
