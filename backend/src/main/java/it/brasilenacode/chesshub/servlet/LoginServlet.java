package it.brasilenacode.chesshub.servlet;

import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.model.Utente;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@WebServlet("/log")
public class LoginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        System.out.println(username);
        Utente user = DBManager.getInstance().getUtenteDao().findByPrimaryKey(username);
        boolean autorizzato;

        if (user == null){
            System.out.println("NOT AUTHORIZED.");
            autorizzato = false;
        } else {

            if (password.equals(user.getPassword())) {
                autorizzato = true;
                HttpSession session = req.getSession();
                session.setAttribute("user", user);
                resp.sendRedirect("/home.html");

            } else {
                System.out.println("WRONG PASSWORD.");
                autorizzato = false;
            }

            if (!autorizzato){
                RequestDispatcher dispatcher = req.getRequestDispatcher("/login.html");
                dispatcher.forward(req, resp);
            }

        }
    }

}
