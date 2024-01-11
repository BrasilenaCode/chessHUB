package it.brasilenacode.chesshub.utilities;

import java.util.Map;

public class RecaptchaDirector {
    private static RecaptchaDirector instance = null;
    private Map<String, String> recaptchaChallenges;

    private RecaptchaDirector() {
        JsonReader jsonReader = new JsonReader();
        jsonReader.read(getClass().getResource("/recaptcha-challenges/challenges.json").getPath());
        recaptchaChallenges = jsonReader.getMap("challenge", "response");
    }

    public static RecaptchaDirector getInstance() {
        if (instance == null) {
            instance = new RecaptchaDirector();
        }
        return instance;
    }

    public boolean check(String challenge, String response) {
        return recaptchaChallenges.get(challenge).equals(response);
    }

    public String getRandomChallenge() {
        return recaptchaChallenges.keySet().stream().toList().get((int) (Math.random() * recaptchaChallenges.size()));
    }

    public String getResponse(String challenge) {
        return recaptchaChallenges.get(challenge);
    }
}