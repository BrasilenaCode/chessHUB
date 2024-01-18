package it.brasilenacode.persistenza.DAO;

import it.brasilenacode.persistenza.model.Utente;
import java.util.List;

// DAO dell'utente
public interface UtenteDao {
    // metodo per trovare tutti gli utenti
    List<Utente> findAll();
    // metodo per trovare un utente tramite la chiave primaria (username)
    Utente findByPrimaryKey(String username);
    // metodo per trovare gli utenti con username simile al parametro
    List<Utente> tryToFindUsersByKey(String username);
    // metodo per trovare gli utenti con nome simile al parametro
    List<Utente> tryToFindUserByName(String name);
    // metodo per trovare gli utenti con cognome simile al parametro
    List<Utente> tryToFindUserBySurname(String surname);
    // metodo per aggiornare o salvare un utente
    void saveOrUpdate(Utente utente);
    // metodo per eliminare un utente
    void delete(Utente utente);
    // metodo per trovare tutte le richieste di amicizia di un utente
    List<Utente> getRichieste(Utente utente);
    // metodo per trovare tutti gli utenti che un utente segue
    List<Utente> getFollower(Utente utente);
    // metodo per inviare una richiesta di amicizia
    void segui(Utente seguito, Utente seguace);
    // metodo per accettare una richiesta di amicizia
    void accettaRichiesta(Utente seguito, Utente seguace);
    // metodo per rifiutare una richiesta di amicizia
    void rifiutaRichiesta(Utente seguito, Utente seguace);
}