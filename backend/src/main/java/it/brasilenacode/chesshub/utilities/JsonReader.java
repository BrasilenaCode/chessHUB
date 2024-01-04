package it.brasilenacode.chesshub.utilities;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

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
    public void readFromString(String jsonObj){
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            jsonNode = objectMapper.readTree(jsonObj);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
    public String get(String key){
        if(jsonNode == null)
            return null;
        return jsonNode.get(key).asText();
    }
    public List<String> getArray(String key){
        if(jsonNode == null)
            return null;
        List<String> list = new ArrayList<>();
        if(jsonNode.get(key).isArray()){
            for(int i=0;i < jsonNode.get(key).size();i++){
                list.add(jsonNode.get(key).get(i).asText());
            }
        }
        return list;
    }
}
