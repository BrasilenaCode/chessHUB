package it.brasilenacode.chesshub.utilities;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
public class JsonReader {
    JsonNode jsonNode;
    public void read(String filename) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            jsonNode = objectMapper.readTree(new File(filename));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public String get(String key){
        if(jsonNode == null)
            return null;
        return jsonNode.get(key).asText();
    }
}
