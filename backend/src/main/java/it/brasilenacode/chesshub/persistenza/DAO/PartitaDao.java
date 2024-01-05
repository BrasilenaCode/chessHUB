package it.brasilenacode.chesshub.persistenza.DAO;

import it.brasilenacode.chesshub.persistenza.model.Partita;

import java.util.List;

public interface PartitaDao {
    List<Partita> findAll();
    List<Partita> findAllWithoutReferences();
    Partita findByPrimaryKey(long id);
    void saveOrUpdate(Partita partita);
    void delete(Partita partita);
}
