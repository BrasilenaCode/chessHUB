package it.brasilenacode.chesshub.persistenza.DAO;

import it.brasilenacode.chesshub.persistenza.model.Torneo;

import java.util.List;

public interface TorneoDao {
    public List<Torneo> findAll();
    public Torneo findByPrimaryKey(long id);
    public void saveOrUpdate(Torneo torneo);
    public void delete(Torneo torneo);
}
