package it.brasilenacode.chesshub.utilities;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Map;

public class RecaptchaDirector {
    private static RecaptchaDirector instance = null;
    private Map<String, String> recaptchaChallenges;

    private RecaptchaDirector() {
        JsonReader jsonReader = new JsonReader();
        String filePath = null;
        try {
            filePath = URLDecoder.decode(getClass().getResource("/recaptcha-challenges/challenges.json").getPath(), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        jsonReader.read(filePath);
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