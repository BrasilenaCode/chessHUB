package it.brasilenacode.chesshub.controller;

import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Partita;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:4200/", allowCredentials = "true")
public class PartiteController {
    @GetMapping("/partite/all")
    public List<Partita> dammiPartite(){
        return DBManager.getInstance().getPartitaDao().findAll();
    }
    @PostMapping("/partite/id")
    public Partita dammiPartita(@RequestBody long id){
        return DBManager.getInstance().getPartitaDao().findByPrimaryKey(id);
    }
    @PostMapping("/partite/giocatore")
    public List<Partita> dammiPartiteGiocatore(@RequestBody String username){
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> partita.getPerdente().getUsername().equals(username) || partita.getVincitore().getUsername().equals(username)).toList();
    }
    @PostMapping("/partite/torneo")
    public List<Partita> dammiPartiteTorneo(@RequestBody long id){
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> partita.getTorneo().getId() == id).toList();
    }
    @PostMapping("/partite/data")
    public List<Partita> dammiPartiteData(@RequestBody String data){
        Date date;
        try {
            date = new SimpleDateFormat("yyyy-MM-dd").parse(data);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> date.equals(partita.getData())).toList();
    }
    @PostMapping("/partite/vincitore")
    public List<Partita> dammiPartiteVincitore(@RequestBody String username){
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> partita.getVincitore().getUsername().equals(username)).toList();
    }
    @PostMapping("/partite/perdente")
    public List<Partita> dammiPartitePerdente(@RequestBody String username){
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> partita.getPerdente().getUsername().equals(username)).toList();
    }
}
