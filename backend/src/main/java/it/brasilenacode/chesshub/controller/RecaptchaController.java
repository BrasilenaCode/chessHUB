package it.brasilenacode.chesshub.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import it.brasilenacode.chesshub.utilities.JsonReader;
import it.brasilenacode.chesshub.utilities.RecaptchaDirector;

@RestController
@CrossOrigin(value = "http://localhost:4200/", allowCredentials = "true")
public class RecaptchaController {

    @GetMapping("/recaptcha/get")
    public String getChallenge() {
        return RecaptchaDirector.getInstance().getRandomChallenge();
    }

    @PostMapping("/recaptcha/check")
    public boolean check(HttpServletRequest req, @RequestBody String response) {
        JsonReader jsonReader = new JsonReader();
        jsonReader.readFromString(response);
        String challenge = jsonReader.get("challenge");
        String answer = jsonReader.get("response");
        return RecaptchaDirector.getInstance().check(challenge, answer);
    }
}

