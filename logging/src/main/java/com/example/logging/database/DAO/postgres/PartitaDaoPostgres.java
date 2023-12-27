package com.example.logging.database.DAO.postgres;

import com.example.logging.database.DAO.PartitaDao;
import com.example.logging.database.DAO.model.Partita;
import com.example.logging.database.DAO.model.Torneo;
import com.example.logging.database.DAO.model.Utente;
import com.example.logging.database.DBManager;
import com.example.logging.database.IdBroker;

import java.sql.*;
import java.util.ArrayList;
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
                Utente vincitore= DBManager.getInstance().getUtenteDao().findByPrimaryKey(rs.getString("vincitore"));
                partita.setVincitore(vincitore);
                Utente perdente= DBManager.getInstance().getUtenteDao().findByPrimaryKey(rs.getString("perdente"));
                partita.setPerdente(perdente);
                partita.setData(new Date(rs.getDate("data").getTime()));
                Torneo torneo= DBManager.getInstance().getTorneoDao().findByPrimaryKey(rs.getLong("torneo"));
                partita.setTorneo(torneo);
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
                Utente vincitore= DBManager.getInstance().getUtenteDao().findByPrimaryKey(rs.getString("vincitore"));
                partita.setVincitore(vincitore);
                Utente perdente= DBManager.getInstance().getUtenteDao().findByPrimaryKey(rs.getString("perdente"));
                partita.setPerdente(perdente);
                partita.setData(new Date(rs.getDate("data").getTime()));
                Torneo torneo= DBManager.getInstance().getTorneoDao().findByPrimaryKey(rs.getLong("torneo"));
                partita.setTorneo(torneo);
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
            String insertStr = "INSERT INTO partita VALUES (?, ?, ?, ?, ?)";
            PreparedStatement st;
            try {
                st = connection.prepareStatement(insertStr);
                Long id = IdBroker.getId(connection, "partita");
                partita.setId(id);
                st.setLong(1, partita.getId());
                st.setString(2, partita.getVincitore().getUsername());
                st.setString(3, partita.getPerdente().getUsername());
                st.setLong(4, partita.getTorneo().getId());
                st.setDate(5, new java.sql.Date(partita.getData().getTime()));
                st.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } else {
            String updateStr = "UPDATE partita set vincitore = ?, "
                    + "perdente = ?, "
                    + "torneo = ?, "
                    + "data = ? "
                    + "where id = ?";

            PreparedStatement st;
            try {
                st = connection.prepareStatement(updateStr);
                st.setString(1, partita.getVincitore().getUsername());
                st.setString(2, partita.getPerdente().getUsername());
                st.setLong(3, partita.getTorneo().getId());
                st.setDate(4, new java.sql.Date(partita.getData().getTime()));
                st.setLong(5, partita.getId());
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
