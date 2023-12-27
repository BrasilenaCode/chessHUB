package it.brasilenacode.chesshub.controller;


import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Torneo;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:4200/")
public class UtentiController {
    @GetMapping("/getUtenti")
    public List<Utente> getUtenti(HttpServletRequest req){
        Utente utente = new Utente();
        utente.setCognome("Rossi");
        utente.setNome("Mario");
        utente.setUsername("mario.rossi");
        utente.setAdmin(false);
        utente.setDataNascita(new java.util.Date());
        utente.setPassword("password");
        utente.setNazionalita("Italia");
        utente.setPunteggio(132);
        List<Utente> utenti = DBManager.getInstance().getUtenteDao().findAll();
        utenti.add(utente);
        //List<Utente> utenti= DBManager.getInstance().getUtenteDao().findAll();
        return utenti;
    }
}

