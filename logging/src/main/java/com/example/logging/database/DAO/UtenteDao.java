package com.example.logging.database.DAO;

import com.example.logging.database.DAO.model.Utente;

import java.util.List;

public interface UtenteDao {
    public List<Utente> findAll();
    public Utente findByPrimaryKey(String username);
    public void saveOrUpdate(Utente utente);
    public void delete(Utente utente);
}

