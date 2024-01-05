package it.brasilenacode.chesshub.persistenza.DAO.postgres;

import it.brasilenacode.chesshub.persistenza.DAO.UtenteDao;
import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import it.brasilenacode.chesshub.persistenza.DAO.PartitaDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class UtenteDaoPostgres implements UtenteDao {
    Connection connection;
    private final int PUNTI_PER_VITTORIA = 3;
    private final int PUNTI_PER_PAREGGIO = 1;
    private final int PUNTI_PER_SCONFITTA = 0;
    public UtenteDaoPostgres(Connection connection) {
        this.connection = connection;
    }
    @Override
    public Utente findByPrimaryKey(String username) {
        Utente utente = null;
        String query = "select * from utente where username = ?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1, username);
            ResultSet rs = st.executeQuery();
            if (rs.next()) {
                utente = getProssimoUtente(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return utente;
    }

    @Override
    public List<Utente> findAll() {
        List<Utente> utenti = new ArrayList<Utente>();
        String query = "select * from utente";
        try {
            Statement st = connection.createStatement();
            ResultSet rs = st.executeQuery(query);
            while (rs.next()) {
                Utente utente = getProssimoUtente(rs);
                utenti.add(utente);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return utenti;
    }

    @Override
    public List<Utente> tryToFindUsersByKey(String toSearch) {
        List<Utente> utenti = new ArrayList<Utente>();
        String query = "select * from utente where username like ? or nome like ? or cognome like ?";
        try {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, "%" + toSearch + "%");
            statement.setString(2, "%" + toSearch + "%");
            statement.setString(3, "%" + toSearch + "%");
            try (ResultSet rs = statement.executeQuery()) {
                while (rs.next()) {
                    Utente utente = getProssimoUtente(rs);
                    utenti.add(utente);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return utenti;
    }

    @Override
    public void saveOrUpdate(Utente utente) {
        if (findByPrimaryKey(utente.getUsername()) == null) {
            String insertStr = "INSERT INTO utente VALUES (?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement st;
            try {
                st = connection.prepareStatement(insertStr);
                st.setString(1, utente.getNome());
                st.setString(2, utente.getCognome());
                st.setString(3, utente.getUsername());
                st.setString(4, utente.getPassword());
                st.setDate(5, new java.sql.Date(utente.getDataNascita().getTime()));
                st.setString(6, utente.getNazionalita());
                st.setBoolean(7, false); //utente.isAdmin()
                st.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } else {
            String updateStr = "UPDATE utente set nome = ?, "
                    + "cognome = ?, "
                    + "password = ?, "
                    + "data_nascita = ?, "
                    + "nazionalità = ?,"
                    + "admin = ? "
                    + "where username = ?";

            PreparedStatement st;
            try {
                st = connection.prepareStatement(updateStr);
                st.setString(1, utente.getNome());
                st.setString(2, utente.getCognome());
                st.setString(3, utente.getPassword());
                st.setDate(4, new java.sql.Date(utente.getDataNascita().getTime()));
                st.setString(5, utente.getNazionalita());
                st.setBoolean(6, utente.isAdmin());
                st.setString(7, utente.getUsername());
                st.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    @Override
    public void delete(Utente utente) {
        String query = "DELETE FROM utente WHERE username = ?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1, utente.getUsername());
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    @Override
    public List<Utente> getRichieste(Utente utente) {
        List<Utente> richieste = new ArrayList<Utente>();
        String query = "Select seguace "+
                "from follow " +
                "where seguito = ? and stato=false";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1, utente.getUsername());
            ResultSet rs = st.executeQuery();
            while(rs.next()) {
                Utente u = DBManager.getInstance().getUtenteDao().findByPrimaryKey(rs.getString("seguace"));
                richieste.add(u);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return richieste;
    }

    @Override
    public List<Utente> getFollower(Utente utente) {
        List<Utente> follower = new ArrayList<Utente>();
        String query = "Select seguace "+
                "from follow " +
                "where stato=true and seguito = ?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1, utente.getUsername());
            ResultSet rs = st.executeQuery();
            while(rs.next()) {
                Utente u = DBManager.getInstance().getUtenteDao().findByPrimaryKey(rs.getString("seguace"));
                follower.add(u);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return follower;
    }

    @Override
    public void segui(Utente seguito, Utente seguace) {
        if(!getFollower(seguito).contains(seguace)&&!getRichieste(seguito).contains(seguace)) {
            String insertStr = "INSERT INTO follow VALUES (?, ?, ?)";
            PreparedStatement st;
            try {
                st = connection.prepareStatement(insertStr);
                st.setString(1, seguito.getUsername());
                st.setString(2, seguace.getUsername());
                st.setBoolean(3, false);
                st.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void accettaRichiesta(Utente seguito, Utente seguace) {
        String insertStr = "INSERT INTO follow VALUES (?, ?, ?)";
        PreparedStatement st;
        try {
            st = connection.prepareStatement(insertStr);
            st.setString(1, seguace.getUsername());
            st.setString(2, seguito.getUsername());
            st.setBoolean(3, true);
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        String updateStr = "UPDATE follow set stato=true "
                + "where seguace = ? and seguito = ?";
        try {
            st = connection.prepareStatement(updateStr);
            st.setString(1, seguace.getUsername());
            st.setString(2, seguito.getUsername());
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void rifiutaRichiesta(Utente seguito, Utente seguace) {
        String query = "DELETE FROM follow WHERE seguito = ? and seguace= ?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1, seguito.getUsername());
            st.setString(2, seguace.getUsername());
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    private Utente getProssimoUtente(ResultSet rs) throws SQLException{
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
        return utente;
    }
    private int getPunteggio(String username){
        PartitaDao partitaDaoPostgres = DBManager.getInstance().getPartitaDao();
        long vittorie = partitaDaoPostgres.findAllWithoutReferences().stream().filter(partita -> (partita.getEsito().equals("1") && partita.getGiocatore1().getUsername().equals(username)) || (partita.getEsito().equals("2") && partita.getGiocatore2().getUsername().equals(username))).count();
        long pareggi = partitaDaoPostgres.findAllWithoutReferences().stream().filter(partita -> partita.getEsito().equals("3") && (partita.getGiocatore1().getUsername().equals(username) || partita.getGiocatore2().getUsername().equals(username))).count();
        long sconfitte = partitaDaoPostgres.findAllWithoutReferences().stream().filter(partita -> (partita.getEsito().equals("2") && partita.getGiocatore1().getUsername().equals(username)) || (partita.getEsito().equals("1") && partita.getGiocatore2().getUsername().equals(username))).count();
        return (int) (vittorie*PUNTI_PER_VITTORIA+pareggi*PUNTI_PER_PAREGGIO+sconfitte*PUNTI_PER_SCONFITTA);
    }
    private int getPunteggioSettimanale(String username){
        PartitaDao partitaDaoPostgres = DBManager.getInstance().getPartitaDao();
        long vittorie = partitaDaoPostgres.findAllWithoutReferences().stream().filter(partita -> ((partita.getEsito().equals("1") && partita.getGiocatore1().getUsername().equals(username)) || (partita.getEsito().equals("2") && partita.getGiocatore2().getUsername().equals(username))) && isInCurrentWeek(partita.getData())).count();
        long pareggi = partitaDaoPostgres.findAllWithoutReferences().stream().filter(partita -> (partita.getEsito().equals("3") && (partita.getGiocatore1().getUsername().equals(username) || partita.getGiocatore2().getUsername().equals(username))) && isInCurrentWeek(partita.getData())).count();
        long sconfitte = partitaDaoPostgres.findAllWithoutReferences().stream().filter(partita -> ((partita.getEsito().equals("2") && partita.getGiocatore1().getUsername().equals(username)) || (partita.getEsito().equals("1") && partita.getGiocatore2().getUsername().equals(username))) && isInCurrentWeek(partita.getData())).count();
        return (int) (vittorie*PUNTI_PER_VITTORIA+pareggi*PUNTI_PER_PAREGGIO+sconfitte*PUNTI_PER_SCONFITTA);
    }
    private static boolean isInCurrentWeek(Date date) {
        Calendar calendar = Calendar.getInstance();
        int currentWeek = calendar.get(Calendar.WEEK_OF_YEAR);
        calendar.setTime(date);
        int weekOfDate = calendar.get(Calendar.WEEK_OF_YEAR);
        return currentWeek == weekOfDate;
    }
}
