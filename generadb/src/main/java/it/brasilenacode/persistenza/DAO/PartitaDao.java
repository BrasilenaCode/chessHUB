package it.brasilenacode.persistenza.DAO;
import it.brasilenacode.persistenza.model.Partita;

import java.util.List;

// DAO della partita
public interface PartitaDao {
    // metodo per trovare tutte le partite
    List<Partita> findAll();
    // metodo per trovare tutte le partite senza caricare i riferimenti a tornei e utenti
    List<Partita> findAllWithoutReferences();
    // metodo per trovare le partite tramite la chiave primaria (id)
    Partita findByPrimaryKey(long id);
    // metodo per aggiornare o salvare una partita
    void saveOrUpdate(Partita partita);
    // metodo per eliminare una partita
    void delete(Partita partita);
}
