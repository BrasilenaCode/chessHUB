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

// controller per i servizi di registrazione
@RestController
public class RegisterController {
    // chiamata per la registrazione
    @PostMapping("/register")
    public boolean registerUser(@RequestBody String payload) {
        // prendo l'utente dal payload, che è in formato json
        UtenteDao userDao = DBManager.getInstance().getUtenteDao();
        ObjectMapper objectMapper = new ObjectMapper();
        Utente inputUser = null;
        try {
            // lo leggo dal formato json
            inputUser = objectMapper.readValue(payload, new TypeReference<Utente>(){});
        } catch (IOException e) {
            return false;
        }
        // se l'ho preso correttamente
        if (inputUser != null) {
            Utente tmpUser = userDao.findByPrimaryKey(inputUser.getUsername());
            if (tmpUser == null) {
                // se non esistono altri utenti con lo stesso username, lo salvo nel database
                userDao.saveOrUpdate(inputUser);
                return true;
            }
        }
        // se non è andato a buon fine, restituisco false
        return false;
    }

}
