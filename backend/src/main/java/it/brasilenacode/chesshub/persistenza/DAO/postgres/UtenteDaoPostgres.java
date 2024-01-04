package it.brasilenacode.chesshub.persistenza.DAO.postgres;

import it.brasilenacode.chesshub.persistenza.DAO.UtenteDao;
import it.brasilenacode.chesshub.persistenza.model.Utente;

import java.sql.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class UtenteDaoPostgres implements UtenteDao {
    Connection connection;
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
                utente = new Utente();
                utente.setNome(rs.getString("nome"));
                utente.setCognome(rs.getString("cognome"));
                utente.setUsername(rs.getString("username"));
                utente.setPassword(rs.getString("password"));
                utente.setNazionalita(rs.getString("nazionalità"));
                utente.setPunteggio(rs.getInt("punteggio"));
                utente.setPunteggioSettimanale(rs.getInt("punteggio_settimanale"));
                utente.setDataNascita(new Date(rs.getDate("data_nascita").getTime()));
                utente.setAdmin(rs.getBoolean("admin"));
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
                Utente utente = new Utente();
                utente.setNome(rs.getString("nome"));
                utente.setCognome(rs.getString("cognome"));
                utente.setUsername(rs.getString("username"));
                utente.setPassword(rs.getString("password"));
                utente.setNazionalita(rs.getString("nazionalità"));
                utente.setPunteggio(rs.getInt("punteggio"));
                utente.setPunteggioSettimanale(rs.getInt("punteggio_settimanale"));
                utente.setAdmin(rs.getBoolean("admin"));
                utente.setDataNascita(new Date(rs.getDate("data_nascita").getTime()));
                utenti.add(utente);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return utenti;
    }

    @Override
    public Utente tryToFindUserByKey(String username) {
        String query = "select * from utente where username like ?";

        try {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, "%" + username + "%");
            try (ResultSet rs = statement.executeQuery()) {
                if (rs.next()) {
                    Utente utente = new Utente();
                    utente.setNome(rs.getString("nome"));
                    utente.setCognome(rs.getString("cognome"));
                    utente.setUsername(rs.getString("username"));
                    utente.setPassword(rs.getString("password"));
                    utente.setNazionalita(rs.getString("nazionalità"));
                    utente.setPunteggio(rs.getInt("punteggio"));
                    utente.setPunteggioSettimanale(rs.getInt("punteggio_settimanale"));
                    utente.setAdmin(rs.getBoolean("admin"));
                    utente.setDataNascita(new Date(rs.getDate("data_nascita").getTime()));
                    return utente;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void saveOrUpdate(Utente utente) {
        if (findByPrimaryKey(utente.getUsername()) == null) {
            String insertStr = "INSERT INTO utente VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement st;
            try {
                st = connection.prepareStatement(insertStr);
                st.setString(1, utente.getNome());
                st.setString(2, utente.getCognome());
                st.setString(3, utente.getUsername());
                st.setString(4, utente.getPassword());
                st.setDate(5, new java.sql.Date(utente.getDataNascita().getTime()));
                st.setString(6, utente.getNazionalita());
                st.setInt(7, utente.getPunteggio());
                st.setBoolean(8, false); //utente.isAdmin()
                st.setInt(9, utente.getPunteggioSettimanale());
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
                    + "punteggio = ? ,"
                    + "admin = ? ,"
                    + "punteggio_settimanale = ? "
                    + "where username = ?";

            PreparedStatement st;
            try {
                st = connection.prepareStatement(updateStr);
                st.setString(1, utente.getNome());
                st.setString(2, utente.getCognome());
                st.setString(3, utente.getPassword());
                st.setDate(4, new java.sql.Date(utente.getDataNascita().getTime()));
                st.setString(5, utente.getNazionalita());
                st.setInt(6, utente.getPunteggio());
                st.setBoolean(7, utente.isAdmin());
                st.setInt(8, utente.getPunteggioSettimanale());
                st.setString(9, utente.getUsername());
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
}
