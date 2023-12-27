package it.brasilenacode.chesshub.persistenza.DAO;

import it.brasilenacode.chesshub.persistenza.model.Partita;

import java.util.List;

public interface PartitaDao {
    public List<Partita> findAll();
    public Partita findByPrimaryKey(long id);
    public void saveOrUpdate(Partita partita);
    public void delete(Partita partita);
}
