package it.brasilenacode.chesshub.servlet;

import it.brasilenacode.chesshub.controller.Auth;
import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Partita;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import it.brasilenacode.chesshub.utilities.PartiteModel;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.awt.image.DataBuffer;
import java.io.IOException;
import java.util.List;

@WebServlet("/profilo")
@CrossOrigin(value = "http://localhost:4200/", allowCredentials = "true")
public class ProfiloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(req.getParameter("username"));
        Utente u= DBManager.getInstance().getUtenteDao().findByPrimaryKey(req.getParameter("username"));
        req.setAttribute("utente", u);
        RequestDispatcher dispatcher = req.getRequestDispatcher("/views/profilo.html");
        dispatcher.forward(req, resp);
    }
}
