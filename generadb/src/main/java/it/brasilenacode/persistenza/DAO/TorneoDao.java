package it.brasilenacode.persistenza.DAO;

import it.brasilenacode.persistenza.model.Torneo;
import it.brasilenacode.persistenza.model.Utente;

import java.util.List;

// DAO del torneo
public interface TorneoDao {
    // metodo per trovare tutti i tornei
    List<Torneo> findAll();
    // metodo per trovare un torneo tramite la chiave primaria (id)
    Torneo findByPrimaryKey(long id);
    // metodo per trovare i tornei tramite il nome
    List<Torneo> tryToFindByName(String name);
    // metodo per trovare i tornei tramite il luogo
    List<Torneo> tryToFindByLocation(String location);
    // metodo per aggiornare o salvare un torneo
    void saveOrUpdate(Torneo torneo);
    // metodo per eliminare un torneo
    void delete(Torneo torneo);
    // metodo per rimuovere un partecipante da un torneo
    void removePartecipante(Torneo torneo, Utente utente);
    // metodo per aggiungere un partecipante a un torneo
    void addPartecipante(Torneo torneo, Utente utente);
    // metodo per aggiornare l'iscrizione di un untente ad un torneo
    void aggiornaIscrizione(Utente user);
    // metodo per aggiornare il punteggio di un utente in un torneo
    void updatePunteggio(Torneo torneo, Utente utente, int punteggio);
}
