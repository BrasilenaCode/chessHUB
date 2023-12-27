package org.example.persistenza.DAO;

import org.example.persistenza.model.Torneo;
import org.example.persistenza.model.Utente;

import java.util.List;

public interface TorneoDao {
    public List<Torneo> findAll();
    public Torneo findByPrimaryKey(long id);
    public void saveOrUpdate(Torneo torneo);
    public void delete(Torneo torneo);
}
