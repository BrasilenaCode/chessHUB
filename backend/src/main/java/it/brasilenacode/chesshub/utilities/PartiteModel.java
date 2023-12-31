package it.brasilenacode.chesshub.utilities;

import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Partita;
import org.springframework.web.bind.annotation.RequestBody;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class PartiteModel {

    public static List<Partita> dammiPartite() {
        return DBManager.getInstance().getPartitaDao().findAll();
    }

    public static Partita dammiPartita(long id){
        return DBManager.getInstance().getPartitaDao().findByPrimaryKey(id);
    }

    public static List<Partita> dammiPartiteGiocatore(String username){
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> partita.getGiocatore2().getUsername().equals(username) || partita.getGiocatore1().getUsername().equals(username)).toList();
    }

    public static List<Partita> dammiPartiteTorneo(long id){
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> partita.getTorneo().getId() == id).toList();
    }

    public static List<Partita> dammiPartiteData(String data){
        Date date;
        try {
            date = new SimpleDateFormat("yyyy-MM-dd").parse(data);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> date.equals(partita.getData())).toList();
    }

    public static List<Partita> dammiPartiteVincitore(String username){
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> (partita.getGiocatore1().getUsername().equals(username) && partita.getEsito().equals("1")) || (partita.getGiocatore2().getUsername().equals(username) && partita.getEsito().equals("2"))).toList();
    }

    public static List<Partita> dammiPartitePerdente(String username){
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> (partita.getGiocatore1().getUsername().equals(username) && partita.getEsito().equals("2")) || (partita.getGiocatore2().getUsername().equals(username) && partita.getEsito().equals("1"))).toList();
    }

    public static List<Partita> dammiPartiteGiocate(String username) {
        return new ArrayList<>(DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> (partita.getGiocatore2().getUsername().equals(username) || partita.getGiocatore1().getUsername().equals(username)) && (partita.getEsito().equals("1") || partita.getEsito().equals("2") || partita.getEsito().equals("3"))).toList());
    }

    public static List<Partita> dammiPartiteNonGiocate(String username) {
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> (partita.getGiocatore2().getUsername().equals(username) || partita.getGiocatore1().getUsername().equals(username)) && partita.getEsito().equals("0")).toList();
    }

    public static List<Partita> dammiPartitepatte(String username) {
        return DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> (partita.getGiocatore2().getUsername().equals(username) || partita.getGiocatore1().getUsername().equals(username)) && partita.getEsito().equals("3")).toList();
    }
}
