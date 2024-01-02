package it.brasilenacode.chesshub.utilities;

import org.postgresql.shaded.com.ongres.scram.common.bouncycastle.base64.Base64;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;

public class FlagDirector {
    private final HashMap<String, String> flags;

    private static FlagDirector instance = null;

    private FlagDirector() {
        flags = new HashMap<String, String>();
    }

    public static FlagDirector getInstance(){
        if(instance == null){
            instance = new FlagDirector();
        }
        return instance;
    }

    public String getFlag(String nationality){
        if(!flags.containsKey(nationality)){
            byte[] Image = null;
            try {
                URL urlToFlag = getClass().getResource("/static/flags/" + nationality + ".png");
                if(urlToFlag != null){
                    Image = Files.readAllBytes(Path.of(urlToFlag.toURI()));
                } else {
                    return getFlag("unknown");
                }
            }
            catch (IOException e){
                return getFlag("unknown");
            } catch (URISyntaxException e){
                return getFlag("unknown");
            }
            flags.put(nationality, Base64.toBase64String(Image));
        }
        return flags.get(nationality);
    }

    public String getNationality(String flag){
        for(String key : flags.keySet()){
            if(flags.get(key).equals(flag)){
                return key;
            }
        }
        return "unknown";
    }

}
