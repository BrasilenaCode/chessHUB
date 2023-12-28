package it.brasilenacode.chesshub.controller;


import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:4200/")
public class UtentiController {
    @GetMapping("/utenti/all")
    public List<Utente> dammiUtenti(){
        return DBManager.getInstance().getUtenteDao().findAll();
    }
    @PostMapping("/utenti/username")
    public Utente dammiUtente(@RequestBody String username){
        return DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
    }
    @PostMapping("/utenti/nome")
    public List<Utente> dammiUtentiNome(@RequestBody String nome){
        return DBManager.getInstance().getUtenteDao().findAll().stream().filter(utente -> utente.getNome().equals(nome)).toList();
    }
    @PostMapping("/utenti/cognome")
    public List<Utente> dammiUtentiCognome(@RequestBody String cognome){
        return DBManager.getInstance().getUtenteDao().findAll().stream().filter(utente -> utente.getCognome().equals(cognome)).toList();
    }
    @PostMapping("/utenti/nazionalita")
    public List<Utente> dammiUtentiNazionalita(@RequestBody String nazionalita){
        return DBManager.getInstance().getUtenteDao().findAll().stream().filter(utente -> utente.getNazionalita().equals(nazionalita)).toList();
    }
    @PostMapping("/utenti/etaMaggiore")
    public List<Utente> dammiUtentiEtaMaggiore(@RequestBody int eta){
        return DBManager.getInstance().getUtenteDao().findAll().stream().filter(utente -> Period.between(utente.getDataNascita().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(), LocalDate.now()).getYears() > eta).toList();
    }
    @PostMapping("/utenti/etaMinore")
    public List<Utente> dammiUtentiEtaMinore(@RequestBody int eta){
        return DBManager.getInstance().getUtenteDao().findAll().stream().filter(utente -> Period.between(utente.getDataNascita().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(), LocalDate.now()).getYears() < eta).toList();
    }
    @PostMapping("/utenti/etaUguale")
    public List<Utente> dammiUtentiEtaUguale(@RequestBody int eta){
        return DBManager.getInstance().getUtenteDao().findAll().stream().filter(utente -> Period.between(utente.getDataNascita().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(), LocalDate.now()).getYears() == eta).toList();
    }
    @PostMapping("/utenti/punteggioMaggiore")
    public List<Utente> dammiUtentiPunteggioMaggiore(@RequestBody int punteggio){
        return DBManager.getInstance().getUtenteDao().findAll().stream().filter(utente -> utente.getPunteggio() > punteggio).toList();
    }
    @PostMapping("/utenti/punteggioMinore")
    public List<Utente> dammiUtentiPunteggioMinore(@RequestBody int punteggio){
        return DBManager.getInstance().getUtenteDao().findAll().stream().filter(utente -> utente.getPunteggio() < punteggio).toList();
    }
    @PostMapping("/utenti/punteggioUguale")
    public List<Utente> dammiUtentiPunteggioUguale(@RequestBody int punteggio){
        return DBManager.getInstance().getUtenteDao().findAll().stream().filter(utente -> utente.getPunteggio() == punteggio).toList();
    }
}

