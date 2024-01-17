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
// servlet per la visualizzazione del profilo pubblico di un utente
@WebServlet("/utenti/profiloPubblico")
public class ProfiloPubblicoServlet extends HttpServlet {
    // metodo per la gestione della richiesta GET
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // setto gli header per la comunicazione con il frontend
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        // trovo l'utente tramite il parametro username
        Utente u= DBManager.getInstance().getUtenteDao().findByPrimaryKey(req.getParameter("username"));
        // setto i parametri da passare al frontend
        u.setFollower(DBManager.getInstance().getUtenteDao().getFollower(u).size());
        req.setAttribute("utente", u);
        req.setAttribute("bandiera", FlagDirector.getInstance().getFlag(u.getNazionalita()));
        req.setAttribute("eta", Period.between(u.getDataNascita().toInstant().atZone(java.time.ZoneId.of("UTC+1")).toLocalDate(), LocalDate.now()).getYears());
        // passo la richiesta alla pagina del profilo pubblico
        RequestDispatcher dispatcher = req.getRequestDispatcher("/views/profiloPubblico.html");
        dispatcher.forward(req, resp);
    }
}
