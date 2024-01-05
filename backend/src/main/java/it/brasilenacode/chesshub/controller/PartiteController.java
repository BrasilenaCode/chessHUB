package it.brasilenacode.chesshub.controller;

import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Partita;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import it.brasilenacode.chesshub.utilities.PartiteModel;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpClient;
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

    @PostMapping("/partite/patte")
    public List<Partita> dammiPartitePatte(@RequestBody String username) {
        return PartiteModel.dammiPartitepatte(username);
    }
    @PostMapping("/partite/ultime")
    public List<Partita> dammiUltimePartiteGiocate(@RequestBody String username) {
        return PartiteModel.dammiUltimePartiteGiocate(username);
    }

    @PostMapping("/partite/salva")
    public void addPartita (@RequestBody Partita partita, HttpServletRequest req) {
        if(Auth.isAuthenticated(req)){
            DBManager.getInstance().getPartitaDao().saveOrUpdate(partita);
        }
    }
}
