package it.brasilenacode.chesshub.persistenza.DAO;

import it.brasilenacode.chesshub.persistenza.model.Torneo;
import it.brasilenacode.chesshub.persistenza.model.Utente;

import java.util.List;

public interface TorneoDao {
    List<Torneo> findAll();
    Torneo findByPrimaryKey(long id);
    void saveOrUpdate(Torneo torneo);
    void delete(Torneo torneo);
    void removePartecipante(Torneo torneo, Utente utente);
    void addPartecipante(Torneo torneo, Utente utente);
}
