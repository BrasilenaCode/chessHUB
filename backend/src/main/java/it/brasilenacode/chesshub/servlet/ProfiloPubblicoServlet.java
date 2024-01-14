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
import java.time.Period;
import java.time.LocalDate;

@WebServlet("/utenti/profiloPubblico")
public class ProfiloPubblicoServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        Utente u= DBManager.getInstance().getUtenteDao().findByPrimaryKey(req.getParameter("username"));
        u.setFollower(DBManager.getInstance().getUtenteDao().getFollower(u).size());
        req.setAttribute("utente", u);
        req.setAttribute("bandiera", FlagDirector.getInstance().getFlag(u.getNazionalita()));
        req.setAttribute("eta", Period.between(u.getDataNascita().toInstant().atZone(java.time.ZoneId.of("UTC+1")).toLocalDate(), LocalDate.now()).getYears());
        RequestDispatcher dispatcher = req.getRequestDispatcher("/views/profiloPubblico.html");
        dispatcher.forward(req, resp);
    }
}
