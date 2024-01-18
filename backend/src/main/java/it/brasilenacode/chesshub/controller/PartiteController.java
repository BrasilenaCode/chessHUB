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
    // chiamata per ottenere le partite di un torneo
    @PostMapping("/partite/torneo")
    public List<Partita> dammiPartiteTorneo(@RequestBody long id){
        return PartiteModel.dammiPartiteTorneo(id);
    }
    // chiamata per ottenere le partite di una data
    @PostMapping("/partite/data")
    public List<Partita> dammiPartiteData(@RequestBody String data){
        return PartiteModel.dammiPartiteData(data);
    }
    // chiamata per ottenere le partite vinte da un giocatore
    @PostMapping("/partite/vincitore")
    public List<Partita> dammiPartiteVincitore(@RequestBody String username){
        return PartiteModel.dammiPartiteVincitore(username);
    }
    // chiamata per ottenere le partite perse da un giocatore
    @PostMapping("/partite/perdente")
    public List<Partita> dammiPartitePerdente(@RequestBody String username){
        return PartiteModel.dammiPartitePerdente(username);
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
    // chiamata per ottenere le partite patta di un utente 
    @PostMapping("/partite/patte")
    public List<Partita> dammiPartitePatte(@RequestBody String username) {
        return PartiteModel.dammiPartitepatte(username);
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
            DBManager.getInstance().getPartitaDao().saveOrUpdate(partita);
            // se la partita è in un torneo, aggiorno i punteggi
            if(partita.getTorneo() != null && partita.getTorneo().getId() != -1){
                PartiteModel.aggiornaPunteggi(partita);
            }
            // restituisco l'id della partita
            return partita.getId();
        }
        return null;
    }
    // chiamata per aggiornare una partita nel database, quando un utente viene eliminato
    @PostMapping("/partite/setCustom")
    public void setCustom(HttpServletRequest req) {
        // controllo se sono autenticato (il giocatore che vuole essere eliminato)
        if(Auth.isAuthenticated(req)) {
            String username=Auth.getUser(req).getUsername();
            // prendo tutte le partite dell'utente
            List<Partita> partiteUtente=PartiteModel.dammiPartiteGiocatore(username);
            // per ogni partita, setto l'utente custom come giocatore 1 o 2
            for(Partita p:partiteUtente) {
                Utente custom=DBManager.getInstance().getUtenteDao().findByPrimaryKey("custom");
                if(p.getGiocatore2().getUsername().equals(username)){
                    p.setGiocatore2(custom);
                }
                else if(p.getGiocatore1().getUsername().equals(username)) {
                    p.setGiocatore1(custom);
                }
                // salvo la partita nel database
                DBManager.getInstance().getPartitaDao().saveOrUpdate(p);
            }
        }
    }
    // chiamata per ottenere le partite di un utente che non sono in un torneo
    @GetMapping("/partite/fuoriTorneo")
    public List<Partita> fuoriTorneo(HttpServletRequest req) {
        // prendo le partite
        List<Partita> partite = DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita1 -> partita1.getTorneo().getId() == -1 && partita1.getId()!=-1).toList();
        // ritorno le prime 10 partite, se ne esistono meno di 10 le ritorno tutte
        if(partite.size() < 10)
            return partite;
        else
            return partite.subList(0,9);
    }
    // chiamata per aggiornare i punteggi quando una partita viene aggiunta
    public void aggiornaPunteggi(Partita partita){
        TorneoDao torneoDao = DBManager.getInstance().getTorneoDao();
        int punteggio1 = 0;
        int punteggio2 = 0;
        // se la partita è finita, aggiorno i punteggi
        if(partita.getEsito().equals("1")){
            punteggio1 = 3;
            punteggio2 = 0;
        } else if(partita.getEsito().equals("2")){
            punteggio1 = 0;
            punteggio2 = 3;
        } else if (partita.getEsito().equals("3")){
            punteggio1 = 1;
            punteggio2 = 1;
        }
        // aggiorno i punteggi
        torneoDao.updatePunteggio(partita.getTorneo(), partita.getGiocatore1(), punteggio1);
        torneoDao.updatePunteggio(partita.getTorneo(), partita.getGiocatore2(), punteggio2);
    }
}
