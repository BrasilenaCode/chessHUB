package it.brasilenacode.chesshub;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

// controller per la gestione delle richieste verso le pagine html
@Controller
public class ServletUtil {
    // metodo che prende le risorse html dalla cartella views
    @RequestMapping(value = "/views/**", method = {RequestMethod.GET, RequestMethod.POST})
    public String templateHandler(HttpServletRequest request) {
        String resource = request.getRequestURI().substring("/views/".length());
        resource = resource.substring(0, resource.indexOf(".html"));
        return resource;
    }

}
