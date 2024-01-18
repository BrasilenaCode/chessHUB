package it.brasilenacode.chesshub.controller;

import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.DAO.TorneoDao;
import it.brasilenacode.chesshub.persistenza.model.Partita;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import it.brasilenacode.chesshub.application.PartiteModel;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

// controller per i servizi delle partite
@RestController
@CrossOrigin(value = "http://localhost:4200/", allowCredentials = "true")
public class PartiteController {
    // chiamata per ottenere tutte le partite
    @GetMapping("/partite/all")
    public List<Partita> dammiPartite(){
        return PartiteModel.dammiPartite();
    }
    // chiamata per ottenere una partita dato l'id
    @PostMapping("/partite/id")
    public Partita dammiPartita(@RequestBody long id){
        return PartiteModel.dammiPartita(id);
    }
    // chiamata per ottenere le partite di un giocatore
    @PostMapping("/partite/giocatore")
    public List<Partita> dammiPartiteGiocatore(@RequestBody String username){
        return PartiteModel.dammiPartiteGiocatore(username);
    }
    // chiamata per ottenere le partite già giocate di un utente
    @PostMapping("/partite/giocate")
    public List<Partita> dammiPartiteGiocate(@RequestBody String username) {
        return PartiteModel.dammiPartiteGiocate(username);
    }
    // chiamata per ottenere le partite non giocate di un utente
    @PostMapping("partite/nongiocate")
    public List<Partita> dammiPartiteNonGiocate(@RequestBody String username) {
        return PartiteModel.dammiPartiteNonGiocate(username);
    }
    // chiamata per eliminare una partita
    @PostMapping("partite/elimina")
    public boolean eliminaPartita(HttpServletRequest req, @RequestBody Long id) {
        // posso effettuarlo solo se sono autenticato
        if(Auth.isAuthenticated(req)) {
            DBManager.getInstance().getPartitaDao().delete(DBManager.getInstance().getPartitaDao().findByPrimaryKey(id));
            return true;
        }
        return false;
    }
    // chiamata per ottenere le ultime 3 partite giocate da un utente
    @PostMapping("/partite/ultime")
    public List<Partita> dammiUltimePartiteGiocate(@RequestBody String username) {
        return PartiteModel.dammiUltimePartiteGiocate(username);
    }
    // chiamata per ottenere le ultime 3 partite giocate da un utente non in un torneo
    @PostMapping("/partite/ultimeFuoriTorneo")
    public List<Partita> dammiUltimePartiteFuoriTorneo(@RequestBody String username) {
        return PartiteModel.dammiUltimePartiteFuoriTorneo(username);
    }
    // chiamata per salvare una partita nel database
    @PostMapping("/partite/salva")
    public Long addPartita(HttpServletRequest req, @RequestBody Partita partita) {
        // posso salvare una partita solo se sono autenticato
        if(Auth.isAuthenticated(req)){
            return PartiteModel.aggiungiPartita(partita);
        }
        return null;
    }
    // chiamata per aggiornare una partita nel database, quando un utente viene eliminato
    @PostMapping("/partite/setCustom")
    public void setCustom(HttpServletRequest req) {
        // controllo se sono autenticato (il giocatore che vuole essere eliminato)
        if(Auth.isAuthenticated(req)) {
            PartiteModel.setCustom(Auth.getUser(req).getUsername());
        }
    }
    // chiamata per ottenere le partite di un utente che non sono in un torneo
    @GetMapping("/partite/fuoriTorneo")
    public List<Partita> fuoriTorneo(HttpServletRequest req) {
        return PartiteModel.fuoriTorneo();
    }
}
