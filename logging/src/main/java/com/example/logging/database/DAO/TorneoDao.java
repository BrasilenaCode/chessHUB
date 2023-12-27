package com.example.logging.database.DAO;


import com.example.logging.database.DAO.model.Torneo;

import java.util.List;

public interface TorneoDao {
    public List<Torneo> findAll();
    public Torneo findByPrimaryKey(long id);
    public void saveOrUpdate(Torneo torneo);
    public void delete(Torneo torneo);
}
