package it.brasilenacode.chesshub.controller;

import it.brasilenacode.chesshub.persistenza.model.Torneo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:4200/", allowCredentials = "true")
public class TorneiController {

    @PostMapping("/tornei/stato")
    public List<Torneo> dammiTorneiStato() {
        Torneo t = new Torneo();
        List<Torneo> tornei = new ArrayList<>();
        t.setNome("Torneo 1");
        t.setLuogo("Roma");
        t.setStato("In corso");
        t.setDataInizio(new java.util.Date());
        t.setDataFine(new java.util.Date());
        t.setNumeroPartecipanti(10);
        t.setId(1);
        tornei.add(t);
        return tornei;
    }
}
