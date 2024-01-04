package it.brasilenacode.chesshub.persistenza.DAO;

import it.brasilenacode.chesshub.persistenza.model.Utente;

import java.util.List;

public interface UtenteDao {
    public List<Utente> findAll();
    public Utente tryToFindUserByKey(String username);
    public Utente findByPrimaryKey(String username);
    public void saveOrUpdate(Utente utente);
    public void delete(Utente utente);
}

