package it.brasilenacode.chesshub.application;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.brasilenacode.chesshub.persistenza.DAO.UtenteDao;
import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import org.mindrot.jbcrypt.BCrypt;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class UtenteModel {
    public static List<Integer> getStatistiche(Utente u) {
        // calcolo le statistiche
        Integer partiteVinte = PartiteModel.dammiPartiteVincitore(u.getUsername()).size();
        Integer partitePerse = PartiteModel.dammiPartitePerdente(u.getUsername()).size();
        Integer partitePatte = PartiteModel.dammiPartitepatte(u.getUsername()).size();
        Integer torneiVinti = DBManager.getInstance().
                getTorneoDao().findAll().stream()
                .filter(torneo -> torneo.getStato().equals("concluso") && (torneo.getVincitore()!=null && torneo.getVincitore().getUsername().equals(u.getUsername())))
                .toList().size();
        // ritorno le statistiche
        List<Integer> stats = new ArrayList<>();
        stats.add(partiteVinte);
        stats.add(partitePerse);
        stats.add(partitePatte);
        stats.add(torneiVinti);
        return stats;
    }

    public static List<List<Utente>> ricercaUtenti(String string) {
        // restituisco una lista di liste di utenti
        List<List<Utente>> toSend = new ArrayList<>();
        UtenteDao dao = DBManager.getInstance().getUtenteDao();
        // cerco gli utenti per nome, cognome e username
        toSend.add(dao.tryToFindUsersByKey(string));
        toSend.add(dao.tryToFindUserByName(string));
        toSend.add(dao.tryToFindUserBySurname(string));
        // restituisco la lista
        return toSend;
    }

    public static boolean updateUtente(Utente utente, Map<String, String> dati) {
        String nome=dati.get("key1");
        String cognome=dati.get("key2");
        String nazionalita=dati.get("key4");
        String dataNascita=dati.get("key3");
        utente.setNome(nome);
        utente.setCognome(cognome);
        utente.setNazionalita(nazionalita);
        String inputString = dataNascita;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date date=null;
        try {
            date = sdf.parse(inputString);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        utente.setDataNascita(date);
        // salvo l'utente aggiornato
        DBManager.getInstance().getUtenteDao().saveOrUpdate(utente);
        return true;
    }

    public static boolean updatePassword(Utente utente, Map<String, String> passwords) {
        // controllo che la vecchia password sia corretta
        String oldpwd = passwords.get("key1");
        String pwd = passwords.get("key2");
        if(!BCrypt.checkpw(oldpwd, utente.getPassword())) {
            return false;
        }
        // aggiorno la password
        utente.setPassword(BCrypt.hashpw(pwd, BCrypt.gensalt()));
        DBManager.getInstance().getUtenteDao().saveOrUpdate(utente);
        return true;
    }

    public static boolean recuperoPassword(String data) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode node = objectMapper.readTree(data);
            String username = node.get("username").asText();
            String password = node.get("password").asText();
            UtenteDao dao = DBManager.getInstance().getUtenteDao();
            Utente utente = dao.findByPrimaryKey(username);
            if (utente == null) return false;
            utente.setPassword(BCrypt.hashpw(password, BCrypt.gensalt()));
            return dao.saveOrUpdate(utente);
        } catch (JsonProcessingException e) {
            System.out.println("ERROR TRYING TO READ JSON.");
            e.printStackTrace();
            return false;
        }
    }

    public static boolean createAdmin(String username) {
        Utente utente = DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
        utente.setAdmin(true);
        // salvo l'utente
        DBManager.getInstance().getUtenteDao().saveOrUpdate(utente);
        return true;
    }
}
