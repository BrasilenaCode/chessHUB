package it.brasilenacode.chesshub.persistenza;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class IdBroker {
    public static Long getId(Connection connection, String name){
        Long id = null;
        try {
            String sequenceName=name+"_sequence";
            String query = "SELECT nextval(?) AS id";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, sequenceName);
            ResultSet result = statement.executeQuery();
            result.next();
            id = result.getLong("id");
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return id;
    }
}
