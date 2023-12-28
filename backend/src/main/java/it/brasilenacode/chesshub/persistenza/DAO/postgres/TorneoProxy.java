package it.brasilenacode.chesshub.persistenza.DAO.postgres;


import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Torneo;
import it.brasilenacode.chesshub.persistenza.model.Utente;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class TorneoProxy extends Torneo {
    Connection conn;

    public TorneoProxy(Connection conn){
        this.conn = conn;
    }

    @Override
    public List<Utente> getPartecipanti() {
        List<Utente> partecipanti = new ArrayList<Utente>();
        if (super.getPartecipanti() == null) {
            String query = "Select utente "+
                    "from iscrizione " +
                    "where torneo = ? ";
            try {
                PreparedStatement st = conn.prepareStatement(query);
                st.setLong(1, getId());
                ResultSet rs = st.executeQuery();
                while(rs.next()) {
                    Utente u = DBManager.getInstance().getUtenteDao().findByPrimaryKey(rs.getString("utente"));
                    partecipanti.add(u);
                }
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
            super.setPartecipanti(partecipanti);
            return partecipanti;
        }else{
            return super.getPartecipanti();
        }

    }
}

