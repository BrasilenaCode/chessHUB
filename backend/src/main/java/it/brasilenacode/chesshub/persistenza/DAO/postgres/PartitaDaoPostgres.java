package it.brasilenacode.chesshub.persistenza.DAO.postgres;

import it.brasilenacode.chesshub.persistenza.DAO.PartitaDao;
import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.IdBroker;
import it.brasilenacode.chesshub.persistenza.model.Partita;
import it.brasilenacode.chesshub.persistenza.model.Torneo;
import it.brasilenacode.chesshub.persistenza.model.Utente;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class PartitaDaoPostgres implements PartitaDao {

    Connection connection;
    public PartitaDaoPostgres(Connection connection) {
        this.connection = connection;
    }
    @Override
    public Partita findByPrimaryKey(long id) {
        Partita partita = null;
        String query = "select * from partita where id = ?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setLong(1, id);
            ResultSet rs = st.executeQuery();
            if (rs.next()) {
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
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return partita;
    }

    @Override
    public List<Partita> findAll() {
        List<Partita> partite = new ArrayList<Partita>();
        String query = "select * from partita";
        try {
            Statement st = connection.createStatement();
            ResultSet rs = st.executeQuery(query);
            while (rs.next()) {
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
                partite.add(partita);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return partite;
    }

    @Override
    public void saveOrUpdate(Partita partita) {
        if (findByPrimaryKey(partita.getId()) == null) {
            String insertStr = "INSERT INTO partita VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement st;
            try {
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
                st.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } else {
            String updateStr = "UPDATE partita set vincitore = ?, "
                    + "perdente = ?, "
                    + "torneo = ?, "
                    + "data = ? ,"
                    + "patta= ? ,"
                    + "turno= ?,"
                    + "pgn= ?"
                    + "where id = ?";

            PreparedStatement st;
            try {
                st = connection.prepareStatement(updateStr);
                st.setString(1, partita.getGiocatore1().getUsername());
                st.setString(2, partita.getGiocatore2().getUsername());
                st.setLong(3, partita.getTorneo().getId());
                st.setDate(4, new java.sql.Date(partita.getData().getTime()));
                st.setString(5, partita.getEsito());
                st.setInt(6, partita.getTurno());
                st.setString(7, partita.getPGN());
                st.setLong(8, partita.getId());
                st.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void delete(Partita partita) {
        String query = "DELETE FROM partita WHERE id = ?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setLong(1, partita.getId());
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
