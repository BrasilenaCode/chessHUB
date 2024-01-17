package it.brasilenacode.chesshub.servlet;

import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import it.brasilenacode.chesshub.utilities.FlagDirector;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.text.SimpleDateFormat;

// servlet per la visualizzazione del profilo di un utente
@WebServlet("/profilo")
public class ProfiloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // setto gli header per la comunicazione con il frontend
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        // trovo l'utente tramite il parametro username
        Utente u = DBManager.getInstance().getUtenteDao().findByPrimaryKey(req.getParameter("username"));
        // setto i parametri da passare al frontend
        u.setFollower(DBManager.getInstance().getUtenteDao().getFollower(u).size());
        req.setAttribute("utente", u);
        req.setAttribute("bandiera", FlagDirector.getInstance().getFlag(u.getNazionalita()));
        SimpleDateFormat formatter = new SimpleDateFormat("d MMMM yyyy");
        String formattedDate = formatter.format(u.getDataNascita()); 
        req.setAttribute("dataNascita", formattedDate);
        // passo la richiesta alla pagina del profilo
        RequestDispatcher dispatcher = req.getRequestDispatcher("/views/profilo.html");
        dispatcher.forward(req, resp);
    }
}
