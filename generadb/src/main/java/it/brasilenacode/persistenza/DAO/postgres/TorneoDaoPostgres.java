package it.brasilenacode.persistenza.DAO.postgres;

import it.brasilenacode.persistenza.DAO.TorneoDao;
import it.brasilenacode.persistenza.IdBroker;
import it.brasilenacode.persistenza.model.Torneo;
import it.brasilenacode.persistenza.model.Utente;
import it.brasilenacode.persistenza.DBManager;

import java.sql.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

// DAO del torneo implementato in postgres
public class TorneoDaoPostgres implements TorneoDao {
    Connection connection;
    // costruttore: passo la connessione al database
    public TorneoDaoPostgres(Connection connection) {
        this.connection = connection;
    }
    // metodo per trovare un torneo tramite chiave primaria (id)
    @Override
    public Torneo findByPrimaryKey(long id) {
        Torneo torneo = null;
        // query per trovare il torneo
        String query = "select * from torneo where id = ?";
        try {
            // creo lo statement
            PreparedStatement st = connection.prepareStatement(query);
            // setto il parametro
            st.setLong(1, id);
            // eseguo la query
            ResultSet rs = st.executeQuery();
            // se trovo il torneo
            if (rs.next()) {
                // creo il torneo e setto i parametri
                torneo = getProssimoTorneo(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        // ritorno il torneo
        return torneo;
    }
    // metodo per trovare un torneo tramite nome
    @Override
    public List<Torneo> tryToFindByName(String name) {
        // cerco i tornei con un nome simile a quello passato
        List<Torneo> result = tryToFindBy("nome", name);
        // se ho trovato più di un torneo
        if (result.size() >= 2) {
            // ordino i tornei per lunghezza del nome
            result.sort(Comparator.comparingInt(torneo -> Math.abs(name.length() - torneo.getNome().length())));
        }
        // ritorno i tornei
        return result;
    }
    // metodo per trovare un torneo tramite luogo
    @Override
    public List<Torneo> tryToFindByLocation(String location) {
        // cerco i tornei con un luogo simile a quello passato e li restituisco
        return tryToFindBy("luogo", location);
    }
    // metodo per trovare i tornei con un parametro simile a quello passato
    private List<Torneo> tryToFindBy(String toCheck, String param) {
        // query per trovare i tornei
        String query = "select * from torneo where " + toCheck + " like ?";
        // creo la lista di tornei
        List<Torneo> tornei = new ArrayList<>();
        try {
            // creo lo statement
            PreparedStatement statement = connection.prepareStatement(query);
            // setto il parametro
            statement.setString(1, "%" + param + "%");
            // eseguo la query
            try (ResultSet set = statement.executeQuery()) {
                // per ogni torneo trovato
                while (set.next()) {
                    // creo il torneo e setto i parametri
                    Torneo tmp = getProssimoTorneo(set);
                    // aggiungo il torneo alla lista
                    tornei.add(tmp);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        // ritorno la lista di tornei
        return tornei;
    }
    // metodo per trovare tutti i tornei
    @Override
    public List<Torneo> findAll() {
        // creo la lista di tornei
        List<Torneo> tornei = new ArrayList<>();
        // query per trovare tutti i tornei
        String query = "select * from torneo where id != -1";
        try {
            // creo lo statement
            Statement st = connection.createStatement();
            // eseguo la query
            ResultSet rs = st.executeQuery(query);
            // per ogni torneo trovato
            while (rs.next()) {
                // creo il torneo e setto i parametri
                tornei.add(getProssimoTorneo(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        // ritorno la lista di tornei
        return tornei;
    }
    // metodo per salvare o aggiornare un torneo
    @Override
    public void saveOrUpdate(Torneo torneo) {
        // se il torneo non esiste, devo aggiungerlo
        PreparedStatement st;
        if (findByPrimaryKey(torneo.getId()) == null) {
            // query per aggiungere il torneo
            String insertStr = "INSERT INTO torneo VALUES (?, ?, ?, ?, ?, ?, ?)";
            try {
                // creo lo statement
                st = connection.prepareStatement(insertStr);
                // creo un nuovo id per il torneo
                Long id = IdBroker.getId(connection, "torneo");
                // setto i parametri
                torneo.setId(id);
                st.setLong(1, torneo.getId());
                st.setString(2, torneo.getNome());
                st.setDate(3, new java.sql.Date(torneo.getDataInizio().getTime()));
                st.setDate(4, new java.sql.Date(torneo.getDataFine().getTime()));
                st.setString(5, torneo.getLuogo());
                st.setString(6, torneo.getStato());
                st.setString(7, null);
                // eseguo la query
                st.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        // altrimenti devo aggiornarlo
        } else {
            // query per aggiornare il torneo
            String updateStr = "UPDATE torneo set nome = ?, "
                    + "data_inizio = ?, "
                    + "data_fine = ?, "
                    + "luogo = ?, "
                    + "stato = ?, "
                    + "vincitore = ? "
                    + "where id = ?";
            try {
                // creo lo statement
                st = connection.prepareStatement(updateStr);
                // setto i parametri
                st.setString(1, torneo.getNome());
                st.setDate(2, new java.sql.Date(torneo.getDataInizio().getTime()));
                st.setDate(3, new java.sql.Date(torneo.getDataFine().getTime()));
                st.setString(4, torneo.getLuogo());
                st.setString(5, torneo.getStato());
                // se il torneo non ha un vincitore, setto il campo a null
                if(torneo.getVincitore() == null){
                    st.setString(6, null);
                // altrimenti setto il campo con l'username del vincitore
                } else {
                    st.setString(6, torneo.getVincitore().getUsername());
                }
                st.setLong(7, torneo.getId());
                // eseguo la query
                st.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    // metodo per eliminare un torneo
    @Override
    public void delete(Torneo torneo) {
        // query per eliminare il torneo
        String query = "DELETE FROM torneo WHERE id = ?";
        try {
            // creo lo statement
            PreparedStatement st = connection.prepareStatement(query);
            // setto il parametro
            st.setLong(1, torneo.getId());
            // eseguo la query
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    // metodo per rimuovere un partecipante da un torneo
    @Override
    public void removePartecipante(Torneo torneo, Utente utente) {
        // query per rimuovere il partecipante
        String query = "DELETE FROM iscrizione WHERE torneo = ? and utente = ?";
        try {
            // creo lo statement
            PreparedStatement st = connection.prepareStatement(query);
            // setto i parametri
            st.setLong(1, torneo.getId());
            st.setString(2, utente.getUsername());
            // eseguo la query
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    // metodo per aggiungere un partecipante a un torneo
    @Override
    public void addPartecipante(Torneo torneo, Utente utente) {
        // query per aggiungere il partecipante
        String query = "INSERT INTO iscrizione VALUES (?, ?, ?, ?)";
        try {
            // creo lo statement
            PreparedStatement st = connection.prepareStatement(query);
            // setto i parametri
            st.setString(1, utente.getUsername());
            st.setLong(2, torneo.getId());
            Long id = IdBroker.getId(connection, "iscrizione");
            st.setLong(3, id);
            st.setInt(4, 0);
            // eseguo la query
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        // aggiorno il torneo
        saveOrUpdate(torneo); // todo: si può togliere dato che abbiamo rimosso il campo numeroPartecipanti nel db?
    }
    // metodo per aggiornare l'iscrizione di un utente
    @Override
    public void aggiornaIscrizione(Utente user) {
        // query per aggiornare l'iscrizione
        String updateStr = "UPDATE iscrizione set utente = 'custom'"
                + "where utente = ?";
        try {
            // creo lo statement
            PreparedStatement st = connection.prepareStatement(updateStr);
            // setto il parametro
            st.setString(1, user.getUsername());
            // eseguo la query
            st.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    // metodo per settare un torneo trovato nel db, a partire da un result set
    private Torneo getProssimoTorneo(ResultSet rs) throws SQLException {
        // creo il torneo
        Torneo torneo = new TorneoProxy(connection);
        // setto i parametri
        Utente vincitore= DBManager.getInstance().getUtenteDao().findByPrimaryKey(rs.getString("vincitore"));
        torneo.setAll(rs.getInt("id"), rs.getString("nome"), rs.getString("luogo"), new Date(rs.getDate("data_inizio").getTime()), new Date(rs.getDate("data_fine").getTime()), rs.getString("stato"), vincitore, getNumeroPartecipanti(rs.getInt("id")));
        // ritorno il torneo
        return torneo;
    }
    // metodo per ottenere il numero di partecipanti di un torneo
    private int getNumeroPartecipanti(int id){
        // query per ottenere il numero di partecipanti
        String query = "Select count(*) " +
                        "from iscrizione " +
                        "where torneo = ? ";
        try {
            // creo lo statement
            PreparedStatement st = DBManager.getInstance().getConnection().prepareStatement(query);
            // setto il parametro
            st.setLong(1, id);
            // eseguo la query
            ResultSet rs = st.executeQuery();
            // se trovo il numero di partecipanti
            if(rs.next()) {
                // ritorno il numero di partecipanti
                return rs.getInt("count");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return 0;
    }
    // metodo per aggiornare il punteggio di un utente in un torneo
    public void updatePunteggio(Torneo torneo, Utente utente, int punteggio){
        // query per ottenere il punteggio
        String queryGet = "SELECT * FROM iscrizione WHERE torneo = ? and utente = ?";
        // query per settare il punteggio
        String querySet = "UPDATE iscrizione SET punteggio = ? where torneo = ? and utente = ?";
        try{
            // creo lo statement per ottenere il punteggio
            PreparedStatement stGet = connection.prepareStatement(queryGet);
            // setto i parametri
            stGet.setLong(1, torneo.getId());
            stGet.setString(2, utente.getUsername());
            // eseguo la query
            ResultSet rs = stGet.executeQuery();
            // se trovo il punteggio
            if(rs.next()){
                // aggiungo il punteggio
                punteggio += rs.getInt("punteggio");
            }
            // creo lo statement per settare il punteggio
            PreparedStatement stSet = connection.prepareStatement(querySet);
            // setto i parametri
            stSet.setInt(1, punteggio);
            stSet.setLong(2, torneo.getId());
            stSet.setString(3, utente.getUsername());
            // eseguo la query
            stSet.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
