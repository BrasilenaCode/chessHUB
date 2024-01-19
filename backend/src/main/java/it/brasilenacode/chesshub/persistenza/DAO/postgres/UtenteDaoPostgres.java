package it.brasilenacode.chesshub.persistenza.DAO.postgres;

import it.brasilenacode.chesshub.persistenza.DAO.UtenteDao;
import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import it.brasilenacode.chesshub.persistenza.DAO.PartitaDao;
import java.sql.*;
import java.util.*;
import java.util.Date;

import org.apache.commons.text.similarity.LevenshteinDistance;

public class UtenteDaoPostgres implements UtenteDao {
    Connection connection;
    // punti: 3 per vittoria, 1 per pareggio, 0 per sconfitta
    private final int PUNTI_PER_VITTORIA = 3;
    private final int PUNTI_PER_PAREGGIO = 1;
    private final int PUNTI_PER_SCONFITTA = 0;
    // costruttore: passo la connessione al database
    public UtenteDaoPostgres(Connection connection) {
        this.connection = connection;
    }
    // metodo per trovare un utente tramite chiave primaria (username)
    @Override
    public Utente findByPrimaryKey(String username) {
        Utente utente = null;
        // query per trovare l'utente
        String query = "select * from utente where username = ?";
        try {
            // creo lo statement
            PreparedStatement st = connection.prepareStatement(query);
            // setto il parametro
            st.setString(1, username);
            // eseguo la query
            ResultSet rs = st.executeQuery();
            // se trovo l'utente
            if (rs.next()) {
                // creo l'utente e setto i parametri
                utente = getProssimoUtente(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        // ritorno l'utente
        return utente;
    }
    // metodo per trovare tutti gli utenti
    @Override
    public List<Utente> findAll() {
        // creo la lista degli utenti
        List<Utente> utenti = new ArrayList<Utente>();
        // query per trovare gli utenti
        String query = "select * from utente where username != 'custom'";
        try {
            // creo lo statement
            Statement st = connection.createStatement();
            // eseguo la query
            ResultSet rs = st.executeQuery(query);
            // per ogni utente
            while (rs.next()) {
                // creo l'utente e setto i parametri
                Utente utente = getProssimoUtente(rs);
                // aggiungo l'utente alla lista degli utenti
                utenti.add(utente);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        // ritorno la lista degli utenti
        return utenti;
    }
    // metodo per trovare tutti gli utenti
    @Override
    public List<Utente> tryToFindUsersByKey(String toCheck) {
        // cerco gli utenti per username
        return findAll().stream().filter(utente -> utente.getUsername().toLowerCase().contains(toCheck.toLowerCase())).sorted((u1, u2) -> LevenshteinDistance.getDefaultInstance().apply(toCheck.toLowerCase(), u2.getUsername().toLowerCase()) - LevenshteinDistance.getDefaultInstance().apply(toCheck.toLowerCase(), u1.getUsername().toLowerCase())).toList();
    }
    // metodo per trovare tutti gli utenti
    @Override
    public List<Utente> tryToFindUserByName(String toCheck) {
        // cerco gli utenti per nome
        return findAll().stream().filter(utente -> utente.getNome().toLowerCase().contains(toCheck.toLowerCase())).sorted((u1, u2) -> LevenshteinDistance.getDefaultInstance().apply(toCheck.toLowerCase(), u2.getNome().toLowerCase()) - LevenshteinDistance.getDefaultInstance().apply(toCheck.toLowerCase(), u1.getNome().toLowerCase())).toList();

    }
    // metodo per trovare tutti gli utenti
    @Override
    public List<Utente> tryToFindUserBySurname(String toCheck) {
        // cerco gli utenti per cognome
        return findAll().stream().filter(utente -> utente.getCognome().toLowerCase().contains(toCheck.toLowerCase())).sorted((u1, u2) -> LevenshteinDistance.getDefaultInstance().apply(toCheck.toLowerCase(), u2.getCognome().toLowerCase()) - LevenshteinDistance.getDefaultInstance().apply(toCheck.toLowerCase(), u1.getCognome().toLowerCase())).toList();
    }
    // metodo per salvare o aggiornare un utente
    @Override
    public boolean saveOrUpdate(Utente utente) {
        // se l'utente non esiste, lo devo aggiungere
        if (findByPrimaryKey(utente.getUsername()) == null) {
            // query per aggiungere l'utente
            String insertStr = "INSERT INTO utente VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            try {
                // creo lo statement
                PreparedStatement st = connection.prepareStatement(insertStr);
                // setto i parametri
                st.setString(1, utente.getNome());
                st.setString(2, utente.getCognome());
                st.setString(3, utente.getUsername());
                st.setString(4, utente.getPassword());
                st.setDate(5, new java.sql.Date(utente.getDataNascita().getTime()));
                st.setString(6, utente.getNazionalita());
                st.setBoolean(7, false);
                st.setString(8, utente.getEmail());
                // eseguo la query
                st.executeUpdate();
                return true;
            } catch (SQLException e) {
                e.printStackTrace();
                return false;
            }
        // altrimenti devo aggiornarlo
        } else {
            // query per aggiornare l'utente
            String updateStr = "UPDATE utente set nome = ?, "
                    + "cognome = ?, "
                    + "password = ?, "
                    + "data_nascita = ?, "
                    + "nazionalità = ?,"
                    + "admin = ? "
                    + "where username = ?";
            try {
                // creo lo statement
                PreparedStatement st = connection.prepareStatement(updateStr);
                // setto i parametri
                st.setString(1, utente.getNome());
                st.setString(2, utente.getCognome());
                st.setString(3, utente.getPassword());
                st.setDate(4, new java.sql.Date(utente.getDataNascita().getTime()));
                st.setString(5, utente.getNazionalita());
                st.setBoolean(6, utente.isAdmin());
                st.setString(7, utente.getUsername());
                // eseguo la query
                st.executeUpdate();
                return true;
            } catch (SQLException e) {
                e.printStackTrace();
                return false;
            }
        }
    }
    // metodo per eliminare un utente
    @Override
    public void delete(Utente utente) {
        // query per eliminare le amicizie dell'utente
        String query = "DELETE FROM follow WHERE seguito = ? or seguace = ?";
        try {
            // creo lo statement
            PreparedStatement st = connection.prepareStatement(query);
            // setto i parametri
            st.setString(1, utente.getUsername());
            st.setString(2, utente.getUsername());
            // eseguo la query
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        // query per eliminare l'utente
        query = "DELETE FROM utente WHERE username = ?";
        try {
            // creo lo statement
            PreparedStatement st = connection.prepareStatement(query);
            // setto i parametri
            st.setString(1, utente.getUsername());
            // eseguo la query
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    // metodo per trovare le richieste di amicizia di un utente
    @Override
    public List<Utente> getRichieste(Utente utente) {
        // creo la lista degli utenti che hanno richiesto l'amicizia
        List<Utente> richieste = new ArrayList<Utente>();
        // query per trovare gli utenti che hanno richiesto l'amicizia
        String query = "Select seguace "+
                "from follow " +
                "where seguito = ? and stato=false";
        try {
            // creo lo statement
            PreparedStatement st = connection.prepareStatement(query);
            // setto il parametro
            st.setString(1, utente.getUsername());
            // eseguo la query
            ResultSet rs = st.executeQuery();
            // per ogni utente trovato
            while(rs.next()) {
                // prendo l'utente dal database
                Utente u = DBManager.getInstance().getUtenteDao().findByPrimaryKey(rs.getString("seguace"));
                // aggiungo l'utente alla lista degli utenti che hanno richiesto l'amicizia
                richieste.add(u);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        // ritorno la lista degli utenti che hanno richiesto l'amicizia
        return richieste;
    }
    // metodo per trovare gli amici di un utente
    @Override
    public List<Utente> getFollower(Utente utente) {
        // creo la lista degli amici
        List<Utente> follower = new ArrayList<Utente>();
        // query per trovare gli amici
        String query = "Select seguace "+
                "from follow " +
                "where stato=true and seguito = ?";
        try {
            // creo lo statement
            PreparedStatement st = connection.prepareStatement(query);
            // setto il parametro
            st.setString(1, utente.getUsername());
            // eseguo la query
            ResultSet rs = st.executeQuery();
            // per ogni amico trovato
            while(rs.next()) {
                // prendo l'utente dal database
                Utente u = DBManager.getInstance().getUtenteDao().findByPrimaryKey(rs.getString("seguace"));
                // aggiungo l'utente alla lista degli amici
                follower.add(u);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        // ritorno la lista degli amici
        return follower;
    }
    // metodo per mandare una richiesta di amicizia ad un utente
    @Override
    public void segui(Utente seguito, Utente seguace) {
        // se non sono già amici e se non ho già mandato una richiesta
        if(!getFollower(seguito).contains(seguace)&&!getRichieste(seguito).contains(seguace)) {
            // query per mandare la richiesta
            String insertStr = "INSERT INTO follow VALUES (?, ?, ?)";
            try {
                // creo lo statement
                PreparedStatement st = connection.prepareStatement(insertStr);
                // setto i parametri
                st.setString(1, seguito.getUsername());
                st.setString(2, seguace.getUsername());
                st.setBoolean(3, false);
                // eseguo la query
                st.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    // metodo per accettare una richiesta di amicizia
    @Override
    public void accettaRichiesta(Utente seguito, Utente seguace) {
        // query per inserire l'amicizia inversa
        String insertStr = "INSERT INTO follow VALUES (?, ?, ?)";
        try {
            // creo lo statement
            PreparedStatement st = connection.prepareStatement(insertStr);
            // setto i parametri
            st.setString(1, seguace.getUsername());
            st.setString(2, seguito.getUsername());
            st.setBoolean(3, true);
            // eseguo la query
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        // query per accettare la richiesta
        String updateStr = "UPDATE follow set stato=true "
                + "where seguace = ? and seguito = ?";
        try {
            // creo lo statement
            PreparedStatement st = connection.prepareStatement(updateStr);
            // setto i parametri
            st.setString(1, seguace.getUsername());
            st.setString(2, seguito.getUsername());
            // eseguo la query
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    // metodo per rifiutare una richiesta di amicizia
    @Override
    public void rifiutaRichiesta(Utente seguito, Utente seguace) {
        // query per rifiutare la richiesta
        String query = "DELETE FROM follow WHERE seguito = ? and seguace= ?";
        try {
            // creo lo statement
            PreparedStatement st = connection.prepareStatement(query);
            // setto i parametri
            st.setString(1, seguito.getUsername());
            st.setString(2, seguace.getUsername());
            // eseguo la query
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    // metodo per trovare un utente dato un ResultSet
    private Utente getProssimoUtente(ResultSet rs) throws SQLException{
        // creo l'utente e setto i parametri
        Utente utente = new Utente();
        utente.setNome(rs.getString("nome"));
        utente.setCognome(rs.getString("cognome"));
        utente.setUsername(rs.getString("username"));
        utente.setPassword(rs.getString("password"));
        utente.setNazionalita(rs.getString("nazionalità"));
        utente.setDataNascita(new Date(rs.getDate("data_nascita").getTime()));
        utente.setAdmin(rs.getBoolean("admin"));
        utente.setPunteggio(getPunteggio(utente.getUsername()));
        utente.setPunteggioSettimanale(getPunteggioSettimanale(utente.getUsername()));
        utente.setEmail(rs.getString("email"));
        // ritorno l'utente
        return utente;
    }
    // metodo per calcolare il punteggio totale di un utente
    private int getPunteggio(String username){
        PartitaDao partitaDaoPostgres = DBManager.getInstance().getPartitaDao();
        // calcolo il numero delle vittorie
        long vittorie = partitaDaoPostgres.findAllWithoutReferences().stream().filter(partita -> (partita.getEsito().equals("1") && partita.getGiocatore1().getUsername().equals(username)) || (partita.getEsito().equals("2") && partita.getGiocatore2().getUsername().equals(username))).count();
        // calcolo il numero dei pareggi
        long pareggi = partitaDaoPostgres.findAllWithoutReferences().stream().filter(partita -> partita.getEsito().equals("3") && (partita.getGiocatore1().getUsername().equals(username) || partita.getGiocatore2().getUsername().equals(username))).count();
        // calcolo il numero delle sconfitte
        long sconfitte = partitaDaoPostgres.findAllWithoutReferences().stream().filter(partita -> (partita.getEsito().equals("2") && partita.getGiocatore1().getUsername().equals(username)) || (partita.getEsito().equals("1") && partita.getGiocatore2().getUsername().equals(username))).count();
        // restituisco il punteggio totale
        return (int) (vittorie*PUNTI_PER_VITTORIA+pareggi*PUNTI_PER_PAREGGIO+sconfitte*PUNTI_PER_SCONFITTA);
    }
    // metodo per calcolare il punteggio settimanale di un utente
    private int getPunteggioSettimanale(String username){
        PartitaDao partitaDaoPostgres = DBManager.getInstance().getPartitaDao();
        // calcolo il numero delle vittorie
        long vittorie = partitaDaoPostgres.findAllWithoutReferences().stream().filter(partita -> ((partita.getEsito().equals("1") && partita.getGiocatore1().getUsername().equals(username)) || (partita.getEsito().equals("2") && partita.getGiocatore2().getUsername().equals(username))) && isInCurrentWeek(partita.getData())).count();
        // calcolo il numero dei pareggi
        long pareggi = partitaDaoPostgres.findAllWithoutReferences().stream().filter(partita -> (partita.getEsito().equals("3") && (partita.getGiocatore1().getUsername().equals(username) || partita.getGiocatore2().getUsername().equals(username))) && isInCurrentWeek(partita.getData())).count();
        // calcolo il numero delle sconfitte
        long sconfitte = partitaDaoPostgres.findAllWithoutReferences().stream().filter(partita -> ((partita.getEsito().equals("2") && partita.getGiocatore1().getUsername().equals(username)) || (partita.getEsito().equals("1") && partita.getGiocatore2().getUsername().equals(username))) && isInCurrentWeek(partita.getData())).count();
        // restituisco il punteggio settimanale
        return (int) (vittorie*PUNTI_PER_VITTORIA+pareggi*PUNTI_PER_PAREGGIO+sconfitte*PUNTI_PER_SCONFITTA);
    }
    // metodo per controllare se una data è nella settimana corrente
    private static boolean isInCurrentWeek(Date date) {
        // creo il calendario
        Calendar calendar = Calendar.getInstance();
        // prendo la settimana corrente
        int currentWeek = calendar.get(Calendar.WEEK_OF_YEAR);
        // setto la data
        calendar.setTime(date);
        // prendo la settimana della data
        int weekOfDate = calendar.get(Calendar.WEEK_OF_YEAR);
        // ritorno se la data è nella settimana corrente
        return currentWeek == weekOfDate;
    }
}
