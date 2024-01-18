package it.brasilenacode.chesshub.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import it.brasilenacode.chesshub.application.JsonReader;
import it.brasilenacode.chesshub.application.RecaptchaDirector;

// controller per i servizi di recaptcha
@RestController
@CrossOrigin(value = "http://localhost:4200/", allowCredentials = "true")
public class RecaptchaController {
    // chiamata per ottenere una challenge
    @GetMapping("/recaptcha/get")
    public String getChallenge() {
        // restituisco una challenge casuale
        return RecaptchaDirector.getInstance().getRandomChallenge();
    }
    // chiamata per controllare la risposta
    @PostMapping("/recaptcha/check")
    public boolean check(HttpServletRequest req, @RequestBody String response) {
        // controllo la risposta (challenge e answer), che è in formato json
        JsonReader jsonReader = new JsonReader();
        jsonReader.readFromString(response);
        String challenge = jsonReader.get("challenge");
        String answer = jsonReader.get("response");
        // restituisco il risultato del controllo
        return RecaptchaDirector.getInstance().check(challenge, answer);
    }
}

