package it.brasilenacode.chesshub.controller;


import it.brasilenacode.chesshub.application.UtenteModel;
import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import java.util.*;

// controller per i servizi degli utenti
@RestController
@CrossOrigin(value = "http://localhost:4200/", allowCredentials = "true")
public class UtentiController {
    // chiamata per ottenere un utente dato l'username
    @PostMapping("/utenti/username")
    public Utente dammiUtente(@RequestBody String username){
        return DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
    }
    // chiamata per ottenere l'utente autenticato
    @GetMapping("/utente")
    public Utente dammiUtenteAcceduto(HttpServletRequest req){
        // controllo che l'utente sia autenticato
        if(Auth.isAuthenticated(req)){
            // se è autenticato, restituisco l'utente
            return Auth.getUser(req);
        }
        // se non è autenticato, restituisco null
        return null;
    }
    // chiamata per ottenere tutti gli utenti
    @GetMapping("/utenti/all")
    public List<Utente> dammiUtenti(){
        return DBManager.getInstance().getUtenteDao().findAll();
    }
    // chiamata per eliminare un utente
    @PostMapping("/deleteUtente")
    public boolean deleteUtente(HttpServletRequest req){
        // posso effettuarlo solo se sono autenticato
        Utente utente=Auth.getUser(req);
        if(utente!=null){
            // elimino l'utente
            DBManager.getInstance().getUtenteDao().delete(utente);
            return true;
        }
        // se non sono autenticato, restituisco false
        return false;
    }

    // chiamata per ottenere le statistiche di un utente
    @PostMapping("/utenti/statistiche")
    @ResponseBody
    public List<Integer> ritornaStatistiche(HttpServletRequest req) {
       return UtenteModel.getStatistiche(Auth.getUser(req));
    }
    // chiamata per cercare utenti
    @PostMapping("/utenti/ricerca")
    public List<List<Utente>> ricercaUtenti(@RequestBody String string){
       return UtenteModel.ricercaUtenti(string);
    }
    // chiamata per aggiornare un utente
    @PostMapping("/updateUtente")
    public boolean updateUtente(HttpServletRequest req, @RequestBody Map<String, String> dati){
        // controllo che l'utente sia autenticato
        Utente utente=Auth.getUser(req);
        // se è autenticato, aggiorno i dati
        if(utente!=null){
            return UtenteModel.updateUtente(utente, dati);
        }
        // se non è autenticato, restituisco false
        return false;
    }
    // chiamata per aggiornare la password
    @PostMapping("/updatePassword")
    public boolean updatePassword(HttpServletRequest req, @RequestBody Map<String, String> passwords){
        // controllo che l'utente sia autenticato
        Utente utente=Auth.getUser(req);
        // se è autenticato, aggiorno la password
        if(utente!=null){
           return UtenteModel.updatePassword(utente, passwords);
        }
        // se non è autenticato, restituisco false
        return false;
    }
    // chiamata per ottenere se l'utente autenticato è un admin
    @PostMapping("/utenti/isAdmin")
    public boolean isAdmin(HttpServletRequest req){
        // controllo che l'utente sia autenticato
        if(Auth.isAuthenticated(req)){
            // se è autenticato, restituisco se è admin
            return Auth.getUser(req).isAdmin();
        }
        // se non è autenticato, restituisco false
        return false;
    }
    // chiamata per dare i privilegi di admin ad un utente
    @GetMapping("/utenti/createAdmin")
    public boolean createAdmin(HttpServletRequest req){
        // controllo che l'utente sia autenticato
        if(Auth.isAuthenticated(req)){
            // do i privilegi di admin ad un utente
            Utente utente = DBManager.getInstance().getUtenteDao().findByPrimaryKey(req.getParameter("username"));
            utente.setAdmin(true);
            // salvo l'utente
            DBManager.getInstance().getUtenteDao().saveOrUpdate(utente);
            return true;
        }
        // se non è autenticato, restituisco false
        return false;
    }
    // chiamata per ottenere se un utente è un admin
    @PostMapping("/utente/admin")
    public boolean admin(HttpServletRequest req, @RequestBody String username){
        // controllo che l'utente sia autenticato
        if(Auth.isAuthenticated(req)){
            // restituisco se l'utente è admin
            return DBManager.getInstance().getUtenteDao().findByPrimaryKey(username).isAdmin();
        }
        // se non è autenticato, restituisco false
        return false;
    }
    // chiamata per seguire un utente
    @PostMapping("/utente/segui")
    public void seguiUtente(HttpServletRequest req, @RequestBody String username) {
        Utente u = Auth.getUser(req);
        // se l'utente è autenticato
        if(u!=null){
            // prendo l'utente da seguire
            Utente utenteDaSeguire = DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
            // seguo l'utente
            DBManager.getInstance().getUtenteDao().segui(utenteDaSeguire, u);
        }
    }
    // chiamata per non seguire un utente
    @PostMapping("/utente/nonSeguire")
    public void nonSeguire(HttpServletRequest req, @RequestBody String username) {
        Utente u = Auth.getUser(req);
        // se l'utente è autenticato
        if(u!=null){
            // prendo l'utente da non seguire
            Utente utenteDaSeguire = DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
            // non seguo l'utente
            DBManager.getInstance().getUtenteDao().rifiutaRichiesta(utenteDaSeguire, u);
        }
    }
    // chiamata per sapere se seguo un utente
    @PostMapping("/utente/followers")
    public boolean checkFollow(HttpServletRequest req, @RequestBody String username) {
        Utente u = Auth.getUser(req);
        // se l'utente è autenticato
        if(u!=null){
            // prendo l'utente da controllare
            Utente utenteDaSeguire = DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
            // restituisco true se lo seguo, false altrimenti
            return DBManager.getInstance().getUtenteDao().getFollower(utenteDaSeguire).contains(u);
        }
        // se non è autenticato, restituisco false
        return false;
    }
    // chiamata per ottenere la richiesta che è arrivata ad un utente da un altro utente
    @PostMapping("/utente/richiesta")
    public boolean checkRichieste(HttpServletRequest req, @RequestBody String username) {
        Utente u = Auth.getUser(req);
        // se l'utente è autenticato
        if(u!=null){
            // prendo l'utente da controllare
            Utente utenteDaSeguire = DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
            // restituisco true se ho una richiesta da quell'utente, false altrimenti
            return DBManager.getInstance().getUtenteDao().getRichieste(utenteDaSeguire).contains(u);
        }
        // se non è autenticato, restituisco false
        return false;
    }
    //chiamata per ottenere gli utenti che hanno richiesto di seguire l'utente autenticato
    @PostMapping("/utente/richieste")
    public List<Utente> dammiRichieste(HttpServletRequest req) {
        Utente u = Auth.getUser(req);
        // controllo che l'utente sia autenticato
        if(u!=null){
            // restituisco le richieste
            return DBManager.getInstance().getUtenteDao().getRichieste(u);
        }
        // se non è autenticato, restituisco null
        return null;
    }
    // chiamata per accettare una richiesta
    @PostMapping("/utente/accettaRichiesta")
    public void accettaRichiesta(HttpServletRequest req, @RequestBody Utente utente){
        Utente u = Auth.getUser(req);
        // controllo che l'utente sia autenticato
        if(u!=null){
            // accetto la richiesta
            DBManager.getInstance().getUtenteDao().accettaRichiesta(u, utente);
        }
    }
    // chiamata per rifiutare una richiesta
    @PostMapping("/utente/rifiutaRichiesta")
    public void rifiutaRichiesta(HttpServletRequest req, @RequestBody Utente utente){
        Utente u = Auth.getUser(req);
        // controllo che l'utente sia autenticato
        if(u!=null){
            // rifiuto la richiesta
            DBManager.getInstance().getUtenteDao().rifiutaRichiesta(u, utente);
        }
    }
    // chiamata per ottenere gli utenti che un utente segue
    @PostMapping("/utente/getFollowers")
    public List<Utente> getFollowers(HttpServletRequest req, @RequestBody String username){
       // restituisco gli utenti che segue
        Utente utente = DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
        return DBManager.getInstance().getUtenteDao().getFollower(utente);
    }
}

