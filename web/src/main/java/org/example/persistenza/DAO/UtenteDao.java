package org.example.persistenza.DAO;

import org.example.persistenza.model.Utente;
import java.util.List;

public interface UtenteDao {
    public List<Utente> findAll();
    public Utente findByPrimaryKey(String username);
    public void saveOrUpdate(Utente utente);
    public void delete(Utente utente);
}

