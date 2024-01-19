package it.brasilenacode.chesshub.persistenza.DAO.postgres;

import it.brasilenacode.chesshub.persistenza.DAO.PartitaDao;
import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.IdBroker;
import it.brasilenacode.chesshub.persistenza.model.Partita;
import it.brasilenacode.chesshub.persistenza.model.Torneo;
import it.brasilenacode.chesshub.persistenza.model.Utente;

import java.sql.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

// DAO della partita implementato in postgres
public class PartitaDaoPostgres implements PartitaDao {
    Connection connection;
    // costruttore: passo la connessione al database
    public PartitaDaoPostgres(Connection connection) {
        this.connection = connection;
    }
    // metodo per trovare una parta tramite chiave primaria (id)
    @Override
    public Partita findByPrimaryKey(long id) {
        Partita partita = null;
        // query per trovare la partita
        String query = "select * from partita where id = ?";
        try {
            // creo lo statement
            PreparedStatement st = connection.prepareStatement(query);
            // setto il parametro
            st.setLong(1, id);
            // eseguo la query
            ResultSet rs = st.executeQuery();
            // se trovo la partita
            if (rs.next()) {
                // creo la partita e setto i parametri
                partita = new Partita();
                partita.setId(rs.getLong("id"));
                Utente giocatore1= DBManager.getInstance().getUtenteDao().findByPrimaryKey(rs.getString("giocatore1"));
                partita.setGiocatore1(giocatore1);
                Utente giocatore2= DBManager.getInstance().getUtenteDao().findByPrimaryKey(rs.getString("giocatore2"));
                partita.setGiocatore2(giocatore2);
                partita.setData(new Date(rs.getDate("data").getTime()));
                Torneo torneo= DBManager.getInstance().getTorneoDao().findByPrimaryKey(rs.getLong("torneo"));
                partita.setTorneo(torneo);
                partita.setEsito(rs.getString("esito"));
                partita.setTurno(rs.getInt("turno"));
                partita.setMosse(rs.getString("pgn"));
                partita.setPrivacy(rs.getString("privacy"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        // ritorno la partita
        return partita;
    }
    // metodo per trovare tutte le partite
    @Override
    public List<Partita> findAll() {
        // creo la lista di partite
        List<Partita> partite = new ArrayList<Partita>();
        // query per trovare tutte le partite
        String query = "select * from partita";
        try {
            // creo lo statement
            Statement st = connection.createStatement();
            // eseguo la query
            ResultSet rs = st.executeQuery(query);
            // per ogni partita trovata
            while (rs.next()) {
                // creo la partita e setto i parametri
                Partita partita = new Partita();
                partita.setId(rs.getLong("id"));
                Utente giocatore1= DBManager.getInstance().getUtenteDao().findByPrimaryKey(rs.getString("giocatore1"));
                partita.setGiocatore1(giocatore1);
                Utente giocatore2= DBManager.getInstance().getUtenteDao().findByPrimaryKey(rs.getString("giocatore2"));
                partita.setGiocatore2(giocatore2);
                partita.setData(new Date(rs.getDate("data").getTime()));
                Torneo torneo= DBManager.getInstance().getTorneoDao().findByPrimaryKey(rs.getLong("torneo"));
                partita.setTorneo(torneo);
                partita.setEsito(rs.getString("esito"));
                partita.setMosse(rs.getString("pgn"));
                partita.setTurno(rs.getInt("turno"));
                partita.setPrivacy(rs.getString("privacy"));
                partite.add(partita);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        // ritorno la lista di partite
        return partite;
    }
    // metodo per salvare o aggiornare una partita
    @Override
    public void saveOrUpdate(Partita partita) {
        // se la partita non esiste, la devo aggiungere
        if (findByPrimaryKey(partita.getId()) == null) {
            // query per aggiungere la partita
            String insertStr = "INSERT INTO partita VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            // creo lo statement
            PreparedStatement st;
            try {
                // setto i parametri
                st = connection.prepareStatement(insertStr);
                Long id = IdBroker.getId(connection, "partita");
                partita.setId(id);
                st.setLong(1, partita.getId());
                st.setString(2, partita.getGiocatore1().getUsername());
                st.setString(3, partita.getGiocatore2().getUsername());
                st.setLong(4, partita.getTorneo().getId());
                st.setDate(5, new java.sql.Date(partita.getData().getTime()));
                st.setString(6, partita.getEsito());
                st.setInt(7, partita.getTurno());
                st.setString(8, partita.getPGN());
                st.setString(9, partita.getPrivacy());
                // eseguo la query per aggiungere la partita
                st.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        // altrimenti devo aggiornarla
        } else {
            // query per aggiornare la partita
            String updateStr = "UPDATE partita set giocatore1 = ?, "
                    + "giocatore2 = ?, "
                    + "torneo = ?, "
                    + "data = ? ,"
                    + "esito= ? ,"
                    + "turno= ? ,"
                    + "pgn= ? ,"
                    + "privacy= ? "
                    + "where id = ?";
            // creo lo statement
            PreparedStatement st;
            try {
                // setto i parametri
                st = connection.prepareStatement(updateStr);
                st.setString(1, partita.getGiocatore1().getUsername());
                st.setString(2, partita.getGiocatore2().getUsername());
                st.setLong(3, partita.getTorneo().getId());
                st.setDate(4, new java.sql.Date(partita.getData().getTime()));
                st.setString(5, partita.getEsito());
                st.setInt(6, partita.getTurno());
                st.setString(7, partita.getPGN());
                st.setString(8, partita.getPrivacy());
                st.setLong(9, partita.getId());
                // eseguo la query per aggiornare la partita
                st.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    // metodo per eliminare una partita
    @Override
    public void delete(Partita partita) {
        // query per eliminare la partita
        String query = "DELETE FROM partita WHERE id = ?";
        try {
            // creo lo statement
            PreparedStatement st = connection.prepareStatement(query);
            // setto i parametri
            st.setLong(1, partita.getId());
            // eseguo la query per eliminare la partita
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    // metodo per trovare tutte le partite, senza riferimenti ad utenti o tornei, ma tenendo solo le loro chiavi primarie
    public List<Partita> findAllWithoutReferences(){
        List<Partita> partite = new ArrayList<Partita>();
        // query per trovare tutte le partite
        String query = "select * from partita";
        try {
            // creo lo statement
            Statement st = connection.createStatement();
            // eseguo la query
            ResultSet rs = st.executeQuery(query);
            // per ogni partita trovata
            while (rs.next()) {
                // creo la partita e setto i parametri
                Partita partita = new Partita();
                partita.setId(rs.getLong("id"));
                partita.setGiocatore1(new Utente(rs.getString("giocatore1")));
                partita.setGiocatore2(new Utente(rs.getString("giocatore2")));
                partita.setData(new Date(rs.getDate("data").getTime()));
                Torneo torneo= new Torneo();
                torneo.setId(rs.getLong("torneo"));
                partita.setTorneo(torneo);
                partita.setEsito(rs.getString("esito"));
                partita.setMosse(rs.getString("pgn"));
                partita.setTurno(rs.getInt("turno"));
                partita.setPrivacy(rs.getString("privacy"));
                // aggiungo la partita alla lista
                partite.add(partita);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        // ritorno la lista di partite
        return partite;
    }
}
