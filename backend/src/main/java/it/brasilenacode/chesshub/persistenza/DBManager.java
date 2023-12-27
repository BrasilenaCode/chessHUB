package it.brasilenacode.chesshub.persistenza;

import it.brasilenacode.chesshub.persistenza.DAO.PartitaDao;
import it.brasilenacode.chesshub.persistenza.DAO.TorneoDao;
import it.brasilenacode.chesshub.persistenza.DAO.UtenteDao;
import it.brasilenacode.chesshub.persistenza.DAO.postgres.PartitaDaoPostgres;
import it.brasilenacode.chesshub.persistenza.DAO.postgres.TorneoDaoPostgres;
import it.brasilenacode.chesshub.persistenza.DAO.postgres.UtenteDaoPostgres;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBManager {
    private static DBManager instance = null;
    private Connection connection = null;

    private DBManager(){}

    public static DBManager getInstance(){
        if (instance == null){
            instance = new DBManager();
        }
        return instance;
    }

    public Connection getConnection(){
        if (connection == null){
            try {
                connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/webApp", "postgres", "salvatore");
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return connection;
    }
    public UtenteDao getUtenteDao(){
        return new UtenteDaoPostgres(getConnection());
    }

    public PartitaDao getPartitaDao(){
        return new PartitaDaoPostgres(getConnection());
    }

    public TorneoDao getTorneoDao(){
        return new TorneoDaoPostgres(getConnection());
    }
}
