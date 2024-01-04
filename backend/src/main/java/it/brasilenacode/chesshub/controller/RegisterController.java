package it.brasilenacode.chesshub.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.brasilenacode.chesshub.persistenza.DAO.UtenteDao;
import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class RegisterController {

    @PostMapping("/register")
    public boolean registerUser(@RequestBody String payload) {

        UtenteDao userDao = DBManager.getInstance().getUtenteDao();
        ObjectMapper objectMapper = new ObjectMapper();
        Utente inputUser = null;
        try {
            inputUser = objectMapper.readValue(payload, new TypeReference<Utente>(){});
        } catch (IOException e) {
            System.out.println("ERROR TRYING TO PARSE JSON TO OBJECT Utente.");
            e.printStackTrace();
            return false;
        }

        if (inputUser != null) {
            Utente tmpUser = userDao.findByPrimaryKey(inputUser.getUsername());
            if (tmpUser == null) {
                userDao.saveOrUpdate(inputUser);
                return true;
            }
        }
        return false;
    }

}
