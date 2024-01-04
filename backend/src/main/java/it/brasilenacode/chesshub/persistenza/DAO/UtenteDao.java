package it.brasilenacode.chesshub.persistenza.DAO;

import it.brasilenacode.chesshub.persistenza.model.Utente;

import java.util.List;

public interface UtenteDao {
    List<Utente> findAll();
    Utente findByPrimaryKey(String username);

    List<Utente> tryToFindUsersByKey(String toSearch);

    void saveOrUpdate(Utente utente);
    void delete(Utente utente);

    List<Utente> getRichieste(Utente utente);

    List<Utente> getFollower(Utente utente);

    void segui(Utente seguito, Utente seguace);

    void accettaRichiesta(Utente seguito, Utente seguace);

    void rifiutaRichiesta(Utente seguito, Utente seguace);
}

