package it.brasilenacode.chesshub.application;

import it.brasilenacode.chesshub.controller.Auth;
import it.brasilenacode.chesshub.persistenza.DAO.PartitaDao;
import it.brasilenacode.chesshub.persistenza.DAO.TorneoDao;
import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Partita;
import it.brasilenacode.chesshub.persistenza.model.Torneo;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import jakarta.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class TorneoModel {
    // metodo per generare le partite
    public static List<Partita> generaPartite(int torneoId) {
        // prendo il torneo
        Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
        // setto lo stato del torneo a inCorso
        torneo.setStato("inCorso");
        // salvo il torneo
        DBManager.getInstance().getTorneoDao().saveOrUpdate(torneo);
        // creo la lista delle partite
        List<Partita> partite=new ArrayList<>();
        // prendo i partecipanti
        List<Utente> partecipanti = torneo.getPartecipanti();
        // se il numero di partecipanti è dispari
        if(partecipanti.size()%2 != 0){
            // aggiungo un partecipante fittizio
            Utente riposo = new Utente("__RIPOSO__");
            torneo.addPartecipante(riposo);
        }
        // per ogni turno
        PartitaDao partitaDao = DBManager.getInstance().getPartitaDao();
        // per ogni turno
        for(int turno=1;turno < partecipanti.size();turno++){
            // per ogni partecipante
            for(int partecipante=0;partecipante<partecipanti.size()/2;partecipante++){
                // creo la partita
                Date date = new Date(torneo.getDataInizio().getTime() + (((torneo.getDataFine().getTime() - torneo.getDataInizio().getTime()) / (partecipanti.size()-1)) * turno));
                Partita partita = new Partita(torneo, partecipanti.get(partecipante), partecipanti.get(partecipanti.size() - partecipante-1), date, "0", turno);
                // se non è un riposo
                if (!(partita.getGiocatore2().getUsername().equals("__RIPOSO__") || partita.getGiocatore1().getUsername().equals("__RIPOSO__"))) {
                    // aggiungo la partita alla lista
                    partite.add(partita);
                    // salva la partita nel db
                    partitaDao.saveOrUpdate(partita);
                }
            }
            // ruoto i partecipanti
            partecipanti.add(1, partecipanti.remove(partecipanti.size() - 1));
        }
        // ritorno la lista delle partite
        return partite;
    }

    public static boolean chiudiTorneo(int torneoId) {
        // prendo il torneo
        Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
        // setto lo stato del torneo a concluso
        if (DBManager.getInstance().getPartitaDao().findAll().stream().filter(partita -> partita.getTorneo().getId() == torneo.getId()).map(partita -> partita.getEsito().equals("0")).filter(esito -> esito == true).count() != 0){
            return false;
        }
        // calcolo il vincitore e lo setto nel torneo
        torneo.getPunteggi().entrySet().stream().max(Map.Entry.comparingByValue()).ifPresent(entry -> torneo.setVincitore(DBManager.getInstance().getUtenteDao().findByPrimaryKey(entry.getKey())));
        // setto lo stato del torneo a concluso
        torneo.setStato("passato");
        // salvo il torneo
        DBManager.getInstance().getTorneoDao().saveOrUpdate(torneo);
        return true;
    }

    public static List<List<Torneo>> trovaTornei(String string) {
        // matrice da inviare al frontend
        List<List<Torneo>> toSend = new ArrayList<>();
        TorneoDao dao = DBManager.getInstance().getTorneoDao();
        // aggiungo i tornei trovati tramite nome
        toSend.add(dao.tryToFindByName(string));
        // aggiungo i tornei trovati tramite luogo
        toSend.add(dao.tryToFindByLocation(string));
        // restituisco la matrice dei tornei
        return toSend;
    }

    public static boolean aggiornaCustom(Utente u) {
        // prendo i tornei in cui è iscritto
        List<Torneo> tornei=DBManager.getInstance().getTorneoDao().findAll().stream().filter(torneo -> torneo.getPartecipanti().contains(u)).toList();
        // se un torneo è in corso non posso aggiornarlo
        if(tornei.stream().filter(torneo -> torneo.getStato().equals("inCorso")).count() != 0)
            return false;
        // per ogni torneo a cui è iscritto
        for(Torneo torneo:tornei){
            // se il torneo è prossimo, rimuovo l'iscrizione
            if(torneo.getStato().equals("prossimo"))
                DBManager.getInstance().getTorneoDao().removePartecipante(torneo, u);
                // altrimenti setto l'utente a custom
            else {
                //se l'utente eliminato è il vincitore di un torneo, setto il vincitore a custom
                if(torneo.getVincitore().getUsername().equals(u.getUsername()))
                    torneo.setVincitore(DBManager.getInstance().getUtenteDao().findByPrimaryKey("custom"));
                DBManager.getInstance().getTorneoDao().aggiornaIscrizione(u);
            }
        }
        // restituisco true
        return true;
    }

    public static List<Utente> dammiUtentiTorneo(int torneoId) {
        // prendo il torneo
        Torneo torneo = DBManager.getInstance().getTorneoDao().findByPrimaryKey(torneoId);
        // restituisco gli utenti iscritti al torneo, ordinati per punteggio
        List<Utente> utenti = torneo.getPartecipanti();
        Map<String, Integer> punteggi = torneo.getPunteggi();
        utenti.sort((o1, o2) -> punteggi.get(o1.getUsername()) > punteggi.get(o2.getUsername()) ? -1 : 1);
        return utenti;
    }


    // metodo per trovare le partite
    public static List<Partita> trovaPartite(int torneoId) {
        PartitaDao partitaDao = DBManager.getInstance().getPartitaDao();
        // ritorno la lista delle partite, cercandole nel database
        return new ArrayList<>(partitaDao.findAll().stream().filter(partita -> partita.getTorneo().getId() == torneoId).toList());

    }
}
