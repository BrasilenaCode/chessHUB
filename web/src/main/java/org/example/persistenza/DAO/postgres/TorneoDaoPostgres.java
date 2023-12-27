package org.example.persistenza.DAO.postgres;

import org.example.persistenza.DAO.TorneoDao;
import org.example.persistenza.IdBroker;
import org.example.persistenza.model.Torneo;
import org.example.persistenza.model.Utente;
import org.example.persistenza.DBManager;

import java.sql.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TorneoDaoPostgres implements TorneoDao {

    Connection connection;
    public TorneoDaoPostgres(Connection connection) {
        this.connection = connection;
    }
    @Override
    public Torneo findByPrimaryKey(long id) {
        Torneo torneo = null;
        String query = "select * from torneo where id = ?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setLong(1, id);
            ResultSet rs = st.executeQuery();
            if (rs.next()) {
                torneo = new Torneo();
                torneo.setId(rs.getLong("id"));
                torneo.setNome(rs.getString("nome"));
                torneo.setLuogo(rs.getString("luogo"));
                torneo.setDataInizio(new Date(rs.getDate("data_inizio").getTime()));
                torneo.setDataFine(new Date(rs.getDate("data_fine").getTime()));
                torneo.setStato(rs.getString("stato"));
                Utente vincitore= DBManager.getInstance().getUtenteDao().findByPrimaryKey(rs.getString("vincitore"));
                torneo.setVincitore(vincitore);
                torneo.setNumeroPartecipanti(rs.getInt("numero_partecipanti"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return torneo;
    }

    @Override
    public List<Torneo> findAll() {
        List<Torneo> tornei = new ArrayList<>();
        String query = "select * from torneo";
        try {
            Statement st = connection.createStatement();
            ResultSet rs = st.executeQuery(query);
            while (rs.next()) {
                Torneo torneo = new Torneo();
                torneo.setId(rs.getLong("id"));
                torneo.setNome(rs.getString("nome"));
                torneo.setLuogo(rs.getString("luogo"));
                torneo.setDataInizio(new Date(rs.getDate("data_inizio").getTime()));
                torneo.setDataFine(new Date(rs.getDate("data_fine").getTime()));
                torneo.setStato(rs.getString("stato"));
                Utente vincitore= DBManager.getInstance().getUtenteDao().findByPrimaryKey(rs.getString("vincitore"));
                torneo.setVincitore(vincitore);
                torneo.setNumeroPartecipanti(rs.getInt("numero_partecipanti"));
                tornei.add(torneo);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return tornei;
    }

    @Override
    public void saveOrUpdate(Torneo torneo) {
        if (findByPrimaryKey(torneo.getId()) == null) {
            String insertStr = "INSERT INTO torneo VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement st;
            try {
                st = connection.prepareStatement(insertStr);
                Long id = IdBroker.getId(connection, "torneo");
                torneo.setId(id);
                st.setLong(1, torneo.getId());
                st.setString(2, torneo.getNome());
                st.setDate(3, new java.sql.Date(torneo.getDataInizio().getTime()));
                st.setDate(4, new java.sql.Date(torneo.getDataFine().getTime()));
                st.setString(5, torneo.getLuogo());
                st.setString(6, torneo.getStato());
                st.setString(7, torneo.getVincitore().getUsername());
                st.setInt(8, torneo.getNumeroPartecipanti());
                st.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } else {
            String updateStr = "UPDATE torneo set nome = ?, "
                    + "data_inizio = ?, "
                    + "data_fine = ?, "
                    + "luogo = ?, "
                    + "stato = ?, "
                    + "vincitore = ?, "
                    + "numero_partecipanti = ? "
                    + "where id = ?";

            PreparedStatement st;
            try {
                st = connection.prepareStatement(updateStr);
                st.setString(1, torneo.getNome());
                st.setDate(2, new java.sql.Date(torneo.getDataInizio().getTime()));
                st.setDate(3, new java.sql.Date(torneo.getDataFine().getTime()));
                st.setString(4, torneo.getLuogo());
                st.setString(5, torneo.getStato());
                st.setString(6, torneo.getVincitore().getUsername());
                st.setInt(7, torneo.getNumeroPartecipanti());
                st.setLong(8, torneo.getId());
                st.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void delete(Torneo torneo) {
        String query = "DELETE FROM torneo WHERE id = ?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setLong(1, torneo.getId());
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}