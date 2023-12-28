package it.brasilenacode.chesshub.controller;


import it.brasilenacode.chesshub.persistenza.DAO.UtenteDao;
import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Torneo;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:4200/")
public class UtentiController {
    @PostMapping("/utenti/getUtenti")
    public List<Utente> getUtenti(HttpServletRequest req, @RequestBody String body){
        String[] splitted = body.split("\\.");
        String property = splitted[0];
        String value = splitted[1];
        UtenteDao ud = DBManager.getInstance().getUtenteDao();
        return switch(property){
            case "nome":{
                yield ud.findAll().stream().filter(utente -> utente.getNome().equals(value)).toList();
            }
            case "cognome":{
                yield ud.findAll().stream().filter(utente -> utente.getCognome().equals(value)).toList();
            }
            case "username":{
                yield ud.findAll().stream().filter(utente -> utente.getUsername().equals(value)).toList();
            }
            case "nazionalita":{
                yield ud.findAll().stream().filter(utente -> utente.getNazionalita().equals(value)).toList();
            }
            case "piuGiovaneDi":{
                yield ud.findAll().stream().filter(utente ->
                        utente.getDataNascita().toInstant().isAfter(LocalDate.parse(value,
                                DateTimeFormatter.ofPattern("yyyy-MM-dd")).atStartOfDay().atZone(ZoneId.systemDefault())
                                .toInstant()))
                        .toList();
            }
            case "piuVecchioDi":{
                yield ud.findAll().stream().filter(utente ->
                        utente.getDataNascita().toInstant().isBefore(LocalDate.parse(value,
                                DateTimeFormatter.ofPattern("yyyy-MM-dd")).atStartOfDay().atZone(ZoneId.systemDefault())
                                .toInstant()))
                        .toList();            }
            case "natoIl":{
                yield ud.findAll().stream().filter(utente ->
                        utente.getDataNascita().toInstant().equals(LocalDate.parse(value,
                                DateTimeFormatter.ofPattern("yyyy-MM-dd")).atStartOfDay().atZone(ZoneId.systemDefault())
                                .toInstant()))
                        .toList();
            }
            case "punteggioMaggiore":{
                yield ud.findAll().stream().filter(utente -> utente.getPunteggio() > Integer.parseInt(value)).toList();
            }
            case "punteggioMinore":{
                yield ud.findAll().stream().filter(utente -> utente.getPunteggio() < Integer.parseInt(value)).toList();
            }
            case "punteggioPreciso":{
                yield ud.findAll().stream().filter(utente -> utente.getPunteggio() == Integer.parseInt(value)).toList();
            }
            default:{
                yield ud.findAll();
            }
        };
    }
}

