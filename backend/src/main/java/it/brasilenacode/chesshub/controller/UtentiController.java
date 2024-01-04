package it.brasilenacode.chesshub.controller;


import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:4200/", allowCredentials = "true")
public class UtentiController {
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
    @PostMapping("/getUtente")
    public Utente getUtente(@RequestBody String username, HttpServletRequest req){
        if(Auth.isAuthenticated(req)){
            Utente utente = DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
            return utente;
        }
        return null;
    }

    @GetMapping("/utente")
    public Utente dammiUtenteAcceduto(HttpServletRequest req){
        if(Auth.isAuthenticated(req)){
            return Auth.getUser(req);
        }
        return null;
    }

    @GetMapping("/utenti/all")
    public List<Utente> dammiUtenti(HttpServletRequest req){
        if(Auth.isAuthenticated(req)) {
            return DBManager.getInstance().getUtenteDao().findAll();
        }
        return null;
    }

    @PostMapping("/deleteUtente")
    public boolean deleteUtente(@RequestBody Utente utente, HttpServletRequest req){
        if(Auth.isAuthenticated(req)){
            DBManager.getInstance().getUtenteDao().delete(utente);
            return true;
        }
        return false;
    }

    @PostMapping("/utenti/ricerca")
    public List<Utente> ricercaUtenti(@RequestBody String string, HttpServletRequest req){
        if (Auth.isAuthenticated(req)) {
            return DBManager.getInstance().getUtenteDao().tryToFindUsersByKey(string);
        }
        return null;
    }

    @PostMapping("/updateUtente")
    public boolean updateUtente(@RequestBody Utente utente, HttpServletRequest req){
        if(Auth.isAuthenticated(req)){
            DBManager.getInstance().getUtenteDao().saveOrUpdate(utente);
            return true;
        }
        return false;
    }
    @PostMapping("/utenti/isAdmin")
    public boolean isAdmin(HttpServletRequest req){
        if(Auth.isAuthenticated(req)){
            Utente utente = Auth.getUser(req);
            return utente.isAdmin();
        }
        return false;
    }

    @PostMapping("/utente/segui")
    public void seguiUtente(HttpServletRequest req, @RequestBody String username) {
        Utente u = Auth.getUser(req);
        if(u!=null){
            Utente utenteDaSeguire = DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
            DBManager.getInstance().getUtenteDao().segui(utenteDaSeguire, u);
        }
    }
    @PostMapping("/utente/nonSeguire")
    public void nonSeguire(HttpServletRequest req, @RequestBody String username) {
        Utente u = Auth.getUser(req);
        if(u!=null){
            Utente utenteDaSeguire = DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
            DBManager.getInstance().getUtenteDao().rifiutaRichiesta(utenteDaSeguire, u);
        }
    }
    @PostMapping(  "/utente/followers")
    public boolean checkFollow(HttpServletRequest req, @RequestBody String username) {
        Utente u = Auth.getUser(req);
        if(u!=null){
            Utente utenteDaSeguire = DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
            if(DBManager.getInstance().getUtenteDao().getFollower(utenteDaSeguire).contains(u)){
                return true;
            }
        }
        return false;
    }

    @PostMapping(  "/utente/richiesta")
    public boolean checkRichieste(HttpServletRequest req, @RequestBody String username) {
        Utente u = Auth.getUser(req);
        if(u!=null){
            Utente utenteDaSeguire = DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
            if(DBManager.getInstance().getUtenteDao().getRichieste(utenteDaSeguire).contains(u)){
                return true;
            }
        }
        return false;
    }

    @PostMapping(  "/utente/richieste")
    public List<Utente> dammiRichieste(HttpServletRequest req) {
        Utente u = Auth.getUser(req);
        if(u!=null){
            return DBManager.getInstance().getUtenteDao().getRichieste(u);
        }
        return null;
    }

    @PostMapping(  "/utente/accettaRichiesta")
    public void accettaRichiesta(HttpServletRequest req, @RequestBody Utente utente){
        Utente u = Auth.getUser(req);
        if(u!=null){
            DBManager.getInstance().getUtenteDao().accettaRichiesta(u, utente);
        }
    }

    @PostMapping(  "/utente/rifiutaRichiesta")
    public void rifiutaRichiesta(HttpServletRequest req, @RequestBody Utente utente){
        Utente u = Auth.getUser(req);
        System.out.println(u);
        if(u!=null){
            System.out.println(u);
            DBManager.getInstance().getUtenteDao().rifiutaRichiesta(u, utente);
        }
    }
}

