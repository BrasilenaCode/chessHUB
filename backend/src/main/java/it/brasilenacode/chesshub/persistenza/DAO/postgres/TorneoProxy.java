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

// proxy del torneo
public class TorneoProxy extends Torneo {
    Connection conn;
    // costruttore: passo la connessione al database
    public TorneoProxy(Connection conn){
        this.conn = conn;
    }
    // metodo per trovare tutti i partecipanti del torneo
    @Override
    public List<Utente> getPartecipanti() {
        // creo la lista dei partecipanti
        List<Utente> partecipanti = new ArrayList<Utente>();
        // creo la mappa dei punteggi
        Map<String, Integer> punteggi = new HashMap<String, Integer>();
        // se non ho ancora caricato i partecipanti
        if (super.getPartecipanti() == null) {
            // query per trovare i partecipanti
            String query = "Select utente, punteggio "+
                    "from iscrizione " +
                    "where torneo = ? ";
            try {
                // creo lo statement
                PreparedStatement st = conn.prepareStatement(query);
                // setto il parametro
                st.setLong(1, getId());
                // eseguo la query
                ResultSet rs = st.executeQuery();
                // per ogni partecipante
                while(rs.next()) {
                    // trovo l'utente
                    String username = rs.getString("utente");
                    Utente u = DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
                    // setto il punteggio
                    punteggi.put(username, rs.getInt("punteggio"));
                    // aggiungo l'utente alla lista dei partecipanti
                    partecipanti.add(u);
                }
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
            // setto i partecipanti e i punteggi
            super.setPunteggi(punteggi);
            super.setPartecipanti(partecipanti);
            // ritorno i partecipanti
            return partecipanti;
        }else{
            // ritorno i partecipanti
            return super.getPartecipanti();
        }
    }
    // metodo per ottenere i punteggi
    @Override
    public Map<String, Integer> getPunteggi(){
        // se non ho ancora caricato i partecipanti li carico
        getPartecipanti();
        // ritorno i punteggi
        return super.getPunteggi();
    }
}

