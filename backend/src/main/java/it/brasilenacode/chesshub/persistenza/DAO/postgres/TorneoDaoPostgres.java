package it.brasilenacode.chesshub.persistenza.DAO.postgres;

import it.brasilenacode.chesshub.persistenza.DAO.TorneoDao;
import it.brasilenacode.chesshub.persistenza.IdBroker;
import it.brasilenacode.chesshub.persistenza.model.Torneo;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import it.brasilenacode.chesshub.persistenza.DBManager;
import org.apache.commons.lang3.StringUtils;
import java.sql.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

public class TorneoDaoPostgres implements TorneoDao {

    Connection connection;
    public TorneoDaoPostgres(Connection connection) {
        this.connection = connection;
        if(connection != null){
            String queryControllo = "SELECT * FROM torneo WHERE id = -1";
            try{
                Statement st = connection.createStatement();
                ResultSet rs = st.executeQuery(queryControllo);
                if(!rs.next()){
                    String query = "INSERT INTO torneo VALUES (-1, 'Partite fuori torneo', 'Arcavacata (Rende)', '2024-01-01', '2024-01-01', 'fuoriTorneo', null, 0) ON CONFLICT DO NOTHING";
                    st.executeUpdate(query);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
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
                torneo = new TorneoProxy(connection);
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
    public List<Torneo> tryToFindByName(String name) {
        List<Torneo> result = tryToFindBy("nome", name);
        if (result.size() >= 2) {
            result.sort(Comparator.comparingInt(torneo -> StringUtils.getLevenshteinDistance(name, torneo.getNome())));
        }
        return result;
    }

    @Override
    public List<Torneo> tryToFindByLocation(String location) {
        return tryToFindBy("luogo", location);
    }

    private List<Torneo> tryToFindBy(String toCheck, String param) {
        String query = "select * from torneo where " + toCheck + " like ?";
        List<Torneo> tornei = new ArrayList<>();
        try {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, "%" + param + "%");
            try (ResultSet set = statement.executeQuery()) {
                while (set.next()) {
                    Torneo tmp = getProssimoTorneo(set);
                    tornei.add(tmp);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return tornei;
    }

    @Override
    public List<Torneo> findAll() {
        List<Torneo> tornei = new ArrayList<>();
        String query = "select * from torneo";
        try {
            Statement st = connection.createStatement();
            ResultSet rs = st.executeQuery(query);
            while (rs.next()) {
                Torneo torneo = new TorneoProxy(connection);
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
                st.setString(7, null);
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
                if(torneo.getVincitore() == null){
                    st.setString(6, null);
                } else {
                    st.setString(6, torneo.getVincitore().getUsername());
                }
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

    @Override
    public void removePartecipante(Torneo torneo, Utente utente) {
        String query = "DELETE FROM iscrizione WHERE torneo = ? and utente = ?";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setLong(1, torneo.getId());
            st.setString(2, utente.getUsername());
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    @Override
    public void addPartecipante(Torneo torneo, Utente utente) {
        String query = "INSERT INTO iscrizione VALUES (?, ?)";
        try {
            PreparedStatement st = connection.prepareStatement(query);
            st.setString(1, utente.getUsername());
            st.setLong(2, torneo.getId());
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        saveOrUpdate(torneo);
    }

    private Torneo getProssimoTorneo(ResultSet rs) throws SQLException {
        Torneo torneo = new TorneoProxy(connection);
        torneo.setId(rs.getLong("id"));
        torneo.setNome(rs.getString("nome"));
        torneo.setLuogo(rs.getString("luogo"));
        torneo.setDataInizio(new Date(rs.getDate("data_inizio").getTime()));
        torneo.setDataFine(new Date(rs.getDate("data_fine").getTime()));
        torneo.setStato(rs.getString("stato"));
        Utente vincitore= DBManager.getInstance().getUtenteDao().findByPrimaryKey(rs.getString("vincitore"));
        torneo.setVincitore(vincitore);
        torneo.setNumeroPartecipanti(rs.getInt("numero_partecipanti"));
        return torneo;
    }
}
