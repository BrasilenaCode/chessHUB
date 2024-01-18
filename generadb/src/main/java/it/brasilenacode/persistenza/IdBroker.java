package it.brasilenacode.persistenza;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

// classe per ottenere un id dal database
public class IdBroker {
    // metodo per ottenere un id dal database
    public static Long getId(Connection connection, String name){
        Long id = null;
        try {
            // seleziono la sequenza
            String sequenceName=name+"_sequence";
            // creo la query
            String query = "SELECT nextval(?) AS id";
            // creo lo statement
            PreparedStatement statement = connection.prepareStatement(query);
            // setto il parametro
            statement.setString(1, sequenceName);
            // eseguo la query
            ResultSet result = statement.executeQuery();
            // prendo il primo risultato
            result.next();
            // prendo l'id
            id = result.getLong("id");
        } catch (SQLException e) {
            e.printStackTrace();
        }
        // ritorno l'id
        return id;
    }
}
