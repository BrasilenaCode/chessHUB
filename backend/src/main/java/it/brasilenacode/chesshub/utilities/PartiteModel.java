package it.brasilenacode.chesshub.utilities;

import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.DAO.TorneoDao;
import it.brasilenacode.chesshub.persistenza.model.Partita;

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
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> partita.getGiocatore2().getUsername().equals(username) || partita.getGiocatore1().getUsername().equals(username)).toList();
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
}
