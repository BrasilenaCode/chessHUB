package it.brasilenacode.chesshub.controller;

import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Partita;
import it.brasilenacode.chesshub.persistenza.model.Torneo;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:4200/", allowCredentials = "true")
public class TorneiController {
    @PostMapping("/tornei/id")
    public Torneo dammiTorneo(@RequestBody long id){
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
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> partita.getVincitore().equals(utente) || partita.getPerdente().equals(utente)).map(Partita::getTorneo).distinct().toList();
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
}
