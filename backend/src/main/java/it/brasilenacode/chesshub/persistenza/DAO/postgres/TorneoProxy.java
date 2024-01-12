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
import java.util.Map;
import java.util.HashMap;

public class TorneoProxy extends Torneo {
    Connection conn;

    public TorneoProxy(Connection conn){
        this.conn = conn;
    }

    @Override
    public List<Utente> getPartecipanti() {
        List<Utente> partecipanti = new ArrayList<Utente>();
        Map<String, Integer> punteggi = new HashMap<String, Integer>();
        if (super.getPartecipanti() == null) {
            String query = "Select utente, punteggio "+
                    "from iscrizione " +
                    "where torneo = ? ";
            try {
                PreparedStatement st = conn.prepareStatement(query);
                st.setLong(1, getId());
                ResultSet rs = st.executeQuery();
                while(rs.next()) {
                    String username = rs.getString("utente");
                    Utente u = DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
                    punteggi.put(username, rs.getInt("punteggio"));
                    partecipanti.add(u);
                }
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
            super.setPunteggi(punteggi);
            super.setPartecipanti(partecipanti);
            return partecipanti;
        }else{
            return super.getPartecipanti();
        }
    }
    @Override
    public Map<String, Integer> getPunteggi(){
        getPartecipanti();
        return super.getPunteggi();
    }
}

