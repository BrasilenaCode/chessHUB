package it.brasilenacode.chesshub.persistenza;

import it.brasilenacode.chesshub.persistenza.DAO.PartitaDao;
import it.brasilenacode.chesshub.persistenza.DAO.TorneoDao;
import it.brasilenacode.chesshub.persistenza.DAO.UtenteDao;
import it.brasilenacode.chesshub.persistenza.DAO.postgres.PartitaDaoPostgres;
import it.brasilenacode.chesshub.persistenza.DAO.postgres.TorneoDaoPostgres;
import it.brasilenacode.chesshub.persistenza.DAO.postgres.UtenteDaoPostgres;
import it.brasilenacode.chesshub.application.JsonReader;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

// classe che gestisce la connessione al database
public class DBManager {
    // istanza statica
    private static DBManager instance = null;
    // connessione al database
    private Connection connection = null;
    // costruttore privato
    private DBManager() {}
    // metodo per ottenere l'istanza (pattern singleton)
    public static DBManager getInstance() {
        if (instance == null) {
            instance = new DBManager();
        }
        return instance;
    }
    // metodo per ottenere la connessione al database
    public Connection getConnection() {
        // se non ho ancora la connessione
        if (connection == null) {
            // leggo i parametri di connessione dal file json
            JsonReader jsonReader = new JsonReader();
            jsonReader.read("DBConnectionParameters.json");
            String dbUrl = jsonReader.get("url");
            String dbUser = jsonReader.get("username");
            String dbPassword = jsonReader.get("password");
            try {
                // creo la connessione
                connection = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        // ritorno la connessione
        return connection;
    }
    // metodo per ottenere il DAO degli utenti
    public UtenteDao getUtenteDao() {
        return new UtenteDaoPostgres(getConnection());
    }
    // metodo per ottenere il DAO delle partite
    public PartitaDao getPartitaDao() {
        return new PartitaDaoPostgres(getConnection());
    }
    // metodo per ottenere il DAO dei tornei
    public TorneoDao getTorneoDao() {
        return new TorneoDaoPostgres(getConnection());
    }
    // metodo per creare un utente fittizio, una partita fittizia e un torneo fittizio
    public void createGuest() {
        // se l'utente fittizio non esiste
        if (getUtenteDao().findByPrimaryKey("custom") == null) {
            // query per creare l'utente fittizio
            String query = "INSERT INTO utente VALUES ('custom', 'custom', 'custom', 'custom', '2021-01-01', 'custom', false) ON CONFLICT DO NOTHING";
            try {
                // creo lo statement
                Statement st = connection.createStatement();
                // eseguo la query
                st.executeUpdate(query);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        // se il torneo fittizio non esiste
        if(getTorneoDao().findByPrimaryKey(-1) == null){
            // query per creare il torneo fittizio
            String query = "INSERT INTO torneo VALUES (-1, 'Partite fuori torneo', '2021-01-01', '2021-01-02', 'Arcavacata (Rende)', 'fuoriTorneo', null, 0) ON CONFLICT DO NOTHING";
            try{
                // creo lo statement
                Statement st = connection.createStatement();
                // eseguo la query
                st.executeUpdate(query);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        // se la partita fittizia non esiste
        if(getPartitaDao().findByPrimaryKey(-1) == null){
            // query per creare la partita fittizia
            String query = "INSERT INTO partita VALUES (-1, 'custom', 'custom', -1, '2021-01-01', '-1', 0, '', 'public') ON CONFLICT DO NOTHING";
            try{
                // creo lo statement
                Statement st = connection.createStatement();
                // eseguo la query
                st.executeUpdate(query);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}