package it.brasilenacode.chesshub.application;

import it.brasilenacode.chesshub.controller.Auth;
import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.DAO.TorneoDao;
import it.brasilenacode.chesshub.persistenza.model.Partita;
import it.brasilenacode.chesshub.persistenza.model.Utente;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

// classe per i servizi delle partite
public class PartiteModel {
    // chiamata per ottenere tutte le partite
    public static List<Partita> dammiPartite() {
        return DBManager.getInstance().getPartitaDao().findAll();
    }
    // chiamata per ottenere una partita dato l'id
    public static Partita dammiPartita(long id){
        return DBManager.getInstance().getPartitaDao().findByPrimaryKey(id);
    }
    // chiamata per ottenere le partite di un giocatore
    public static List<Partita> dammiPartiteGiocatore(String username){
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> partita.getId()!=-1 && partita.getGiocatore2().getUsername().equals(username) || partita.getGiocatore1().getUsername().equals(username)).toList();
    }
    // chiamata per ottenere le partite vinte da un giocatore
    public static List<Partita> dammiPartiteVincitore(String username){
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> (partita.getGiocatore1().getUsername().equals(username) && partita.getEsito().equals("1")) || (partita.getGiocatore2().getUsername().equals(username) && partita.getEsito().equals("2"))).toList();
    }
    // chiamata per ottenere le partite perse da un giocatore
    public static List<Partita> dammiPartitePerdente(String username){
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> (partita.getGiocatore1().getUsername().equals(username) && partita.getEsito().equals("2")) || (partita.getGiocatore2().getUsername().equals(username) && partita.getEsito().equals("1"))).toList();
    }
    // chiamata per ottenere le partite già giocate di un utente
    public static List<Partita> dammiPartiteGiocate(String username) {
        return new ArrayList<>(DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> (partita.getGiocatore2().getUsername().equals(username) || partita.getGiocatore1().getUsername().equals(username)) && (partita.getEsito().equals("1") || partita.getEsito().equals("2") || partita.getEsito().equals("3")) && partita.getTorneo().getId()!=-1).toList());
    }
    // chiamata per ottenere le partite già giocate di un utente
    public static List<Partita> dammiPartiteGiocateFuoriTorneo(String username) {
        return new ArrayList<>(DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> (partita.getGiocatore2().getUsername().equals(username) || partita.getGiocatore1().getUsername().equals(username)) && (partita.getEsito().equals("1") || partita.getEsito().equals("2") || partita.getEsito().equals("3")) && partita.getTorneo().getId()==-1).toList());
    }
    // chiamata per ottenere le partite non giocate di un utente
    public static List<Partita> dammiPartiteNonGiocate(String username) {
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> (partita.getGiocatore2().getUsername().equals(username) || partita.getGiocatore1().getUsername().equals(username)) && partita.getEsito().equals("0")).toList();
    }
    // chiamata per ottenere le partite patte di un utente
    public static List<Partita> dammiPartitepatte(String username) {
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> (partita.getGiocatore2().getUsername().equals(username) || partita.getGiocatore1().getUsername().equals(username)) && partita.getEsito().equals("3")).toList();
    }
    // chiamata per ottenere le ultime 3 partite giocate
    public static List<Partita> dammiUltimePartiteGiocate(String username) {
        List<Partita> partite = PartiteModel.dammiPartiteGiocate(username);
        partite.sort((o1, o2) -> o2.getData().compareTo(o1.getData()));
        return partite.subList(0, Math.min(partite.size(), 3));
    }
    // chiamata per ottenere le ultime 3 partite giocate fuori da un torneo
    public static List<Partita> dammiUltimePartiteFuoriTorneo(String username) {
        List<Partita> partite = PartiteModel.dammiPartiteGiocateFuoriTorneo(username);
        partite.sort((o1, o2) -> o2.getData().compareTo(o1.getData()));
        return partite.subList(0, Math.min(partite.size(), 3));
    }
    // chiamata per aggiornare i punteggi quando una partita viene aggiunta
    public static void aggiornaPunteggi(Partita partita){
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

    public static void setCustom(String username) {
        // prendo tutte le partite dell'utente
        List<Partita> partiteUtente = PartiteModel.dammiPartiteGiocatore(username);
        // per ogni partita, setto l'utente custom come giocatore 1 o 2
        for (Partita p : partiteUtente) {
            Utente custom = DBManager.getInstance().getUtenteDao().findByPrimaryKey("custom");
            if (p.getGiocatore2().getUsername().equals(username)) {
                p.setGiocatore2(custom);
            } else if (p.getGiocatore1().getUsername().equals(username)) {
                p.setGiocatore1(custom);
            }
            // salvo la partita nel database
            DBManager.getInstance().getPartitaDao().saveOrUpdate(p);
        }
    }

    public static List<Partita> fuoriTorneo() {
        // prendo le partite
        List<Partita> partite = DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita1 -> partita1.getTorneo().getId() == -1 && partita1.getId()!=-1).toList();
        // ritorno le prime 10 partite, se ne esistono meno di 10 le ritorno tutte
        if(partite.size() < 10)
            return partite;
        else
            return partite.subList(0,9);
    }

    public static Long aggiungiPartita(Partita partita) {
        DBManager.getInstance().getPartitaDao().saveOrUpdate(partita);
        // se la partita è in un torneo, aggiorno i punteggi
        if(partita.getTorneo() != null && partita.getTorneo().getId() != -1){
            aggiornaPunteggi(partita);
        }
        // restituisco l'id della partita
        return partita.getId();
    }
}
