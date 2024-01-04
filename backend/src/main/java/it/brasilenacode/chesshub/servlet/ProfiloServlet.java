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

@WebServlet("/profilo")
public class ProfiloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        Utente u= DBManager.getInstance().getUtenteDao().findByPrimaryKey(req.getParameter("username"));
        req.setAttribute("utente", u);
        req.setAttribute("bandiera", FlagDirector.getInstance().getFlag(u.getNazionalita()));
        RequestDispatcher dispatcher = req.getRequestDispatcher("/views/profilo.html");
        dispatcher.forward(req, resp);
    }
}