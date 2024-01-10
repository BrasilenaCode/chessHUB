package it.brasilenacode.chesshub.persistenza;

import it.brasilenacode.chesshub.persistenza.DAO.PartitaDao;
import it.brasilenacode.chesshub.persistenza.DAO.TorneoDao;
import it.brasilenacode.chesshub.persistenza.DAO.UtenteDao;
import it.brasilenacode.chesshub.persistenza.DAO.postgres.PartitaDaoPostgres;
import it.brasilenacode.chesshub.persistenza.DAO.postgres.TorneoDaoPostgres;
import it.brasilenacode.chesshub.persistenza.DAO.postgres.UtenteDaoPostgres;
import it.brasilenacode.chesshub.utilities.JsonReader;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DBManager {
    private static DBManager instance = null;
    private Connection connection = null;

    private DBManager() {
    }

    public static DBManager getInstance() {
        if (instance == null) {
            instance = new DBManager();
        }
        return instance;
    }

    public Connection getConnection() {
        if (connection == null) {
            JsonReader jsonReader = new JsonReader();
            jsonReader.read("DBConnectionParameters.json");
            String dbUrl = jsonReader.get("url");
            String dbUser = jsonReader.get("username");
            String dbPassword = jsonReader.get("password");
            try {
                connection = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return connection;
    }

    public UtenteDao getUtenteDao() {
        return new UtenteDaoPostgres(getConnection());
    }

    public PartitaDao getPartitaDao() {
        return new PartitaDaoPostgres(getConnection());
    }

    public TorneoDao getTorneoDao() {
        return new TorneoDaoPostgres(getConnection());
    }

    public void createGuest() {
        if (getUtenteDao().findByPrimaryKey("custom") == null) {
            String query = "INSERT INTO utente VALUES ('custom', 'custom', 'custom', 'custom', '2021-01-01', 'custom', false) ON CONFLICT DO NOTHING";
            try {
                Statement st = connection.createStatement();
                st.executeUpdate(query);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if(getTorneoDao().findByPrimaryKey(-1) == null){
            String query = "INSERT INTO torneo VALUES (-1, 'Partite fuori torneo', '2021-01-01', '2021-01-02', 'Arcavacata (Rende)', 'fuoriTorneo', null, 0) ON CONFLICT DO NOTHING";
            try{
                Statement st = connection.createStatement();
                st.executeUpdate(query);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if(getPartitaDao().findByPrimaryKey(-1) == null){
            String query = "INSERT INTO partita VALUES (-1, 'custom', 'custom', -1, '2021-01-01', '-1', 0, '', 'public') ON CONFLICT DO NOTHING";
            try{
                Statement st = connection.createStatement();
                st.executeUpdate(query);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}