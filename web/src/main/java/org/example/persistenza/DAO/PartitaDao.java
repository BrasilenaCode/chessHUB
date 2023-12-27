package org.example.persistenza.DAO;

import org.example.persistenza.model.Partita;

import java.util.List;

public interface PartitaDao {
    public List<Partita> findAll();
    public Partita findByPrimaryKey(long id);
    public void saveOrUpdate(Partita partita);
    public void delete(Partita partita);
}
