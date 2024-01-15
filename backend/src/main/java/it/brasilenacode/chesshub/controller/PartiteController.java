package it.brasilenacode.chesshub.controller;

import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Partita;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import it.brasilenacode.chesshub.utilities.PartiteModel;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:4200/", allowCredentials = "true")
public class PartiteController {
    @GetMapping("/partite/all")
    public List<Partita> dammiPartite(){
        return PartiteModel.dammiPartite();
    }

    @PostMapping("/partite/id")
    public Partita dammiPartita(@RequestBody long id){
        return PartiteModel.dammiPartita(id);
    }
    @PostMapping("/partite/giocatore")
    public List<Partita> dammiPartiteGiocatore(@RequestBody String username){
        return PartiteModel.dammiPartiteGiocatore(username);
    }
    @PostMapping("/partite/torneo")
    public List<Partita> dammiPartiteTorneo(@RequestBody long id){
        return PartiteModel.dammiPartiteTorneo(id);
    }
    @PostMapping("/partite/data")
    public List<Partita> dammiPartiteData(@RequestBody String data){
        return PartiteModel.dammiPartiteData(data);
    }
    @PostMapping("/partite/vincitore")
    public List<Partita> dammiPartiteVincitore(@RequestBody String username){
        return PartiteModel.dammiPartiteVincitore(username);
    }
    @PostMapping("/partite/perdente")
    public List<Partita> dammiPartitePerdente(@RequestBody String username){
        return PartiteModel.dammiPartitePerdente(username);
    }
    @PostMapping("/partite/giocate")
    public List<Partita> dammiPartiteGiocate(@RequestBody String username) {
        return PartiteModel.dammiPartiteGiocate(username);
    }
    @PostMapping("partite/nongiocate")
    public List<Partita> dammiPartiteNonGiocate(@RequestBody String username) {
        return PartiteModel.dammiPartiteNonGiocate(username);
    }

    @PostMapping("partite/elimina")
    public boolean eliminaPartita(HttpServletRequest req, @RequestBody Long id) {
        if(Auth.isAuthenticated(req)) {
            DBManager.getInstance().getPartitaDao().delete(DBManager.getInstance().getPartitaDao().findByPrimaryKey(id));
            return true;
        }
        return false;
    }

    @PostMapping("/partite/patte")
    public List<Partita> dammiPartitePatte(@RequestBody String username) {
        return PartiteModel.dammiPartitepatte(username);
    }
    @PostMapping("/partite/ultime")
    public List<Partita> dammiUltimePartiteGiocate(@RequestBody String username) {
        return PartiteModel.dammiUltimePartiteGiocate(username);
    }

    @PostMapping("/partite/ultimeFuoriTorneo")
    public List<Partita> dammiUltimePartiteFuoriTorneo(@RequestBody String username) {
        return PartiteModel.dammiUltimePartiteFuoriTorneo(username);
    }

    @PostMapping("/partite/salva")
    public Long addPartita(HttpServletRequest req, @RequestBody Partita partita) {
        if(Auth.isAuthenticated(req)){
            DBManager.getInstance().getPartitaDao().saveOrUpdate(partita);
            return partita.getId();
        }
        return null;
    }

    @PostMapping("/partite/setCustom")
    public void setCustom(HttpServletRequest req) {
        if(Auth.isAuthenticated(req)){
            String username=Auth.getUser(req).getUsername();
            List<Partita> partiteUtente=PartiteModel.dammiPartiteGiocatore(username);
            for(Partita p:partiteUtente) {
                Utente custom=DBManager.getInstance().getUtenteDao().findByPrimaryKey("custom");
                if(p.getGiocatore2().getUsername().equals(username)){
                    p.setGiocatore2(custom);
                }
                else if(p.getGiocatore1().getUsername().equals(username)) {
                    p.setGiocatore1(custom);
                }
                DBManager.getInstance().getPartitaDao().saveOrUpdate(p);
            }
        }
    }

    @GetMapping("/partite/fuoriTorneo")
    public List<Partita> fuoriTorneo(HttpServletRequest req) {
        List<Partita> partite = DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita1 -> partita1.getTorneo().getId() == -1).toList();
        if(partite.size() < 10)
            return partite;
        else
            return partite.subList(0,9);
    }

}
