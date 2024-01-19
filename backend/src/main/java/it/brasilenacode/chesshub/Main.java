package it.brasilenacode.chesshub;

import java.util.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import org.mindrot.jbcrypt.BCrypt;

import it.brasilenacode.chesshub.application.TorneoModel;
import it.brasilenacode.chesshub.persistenza.DBManager;
import it.brasilenacode.chesshub.persistenza.DAO.postgres.TorneoProxy;
import it.brasilenacode.chesshub.persistenza.model.Torneo;
import it.brasilenacode.chesshub.persistenza.model.Utente;

public class Main {
    public static void main(String[] args) {
        List<String> nomi = Arrays.stream(new String[]{"Sofia", "Giulia", "Martina", "Aurora", "Alice", "Ginevra", "Emma", "Greta", "Chiara", "Sara", "Francesco", "Alessandro", "Lorenzo", "Leonardo", "Mattia", "Andrea", "Gabriele", "Riccardo", "Matteo", "Tommaso"}).toList();
        List<String> cognomi = Arrays.stream(new String[]{"Rossi", "Russo", "Ferrari", "Esposito", "Bianchi", "Romano", "Colombo", "Ricci", "Marino", "Greco"}).toList();
        List<String> citta = Arrays.stream(new String[]{"Roma", "Milano", "Napoli", "Firenze", "Venezia", "Torino", "Bologna", "Palermo", "Genova", "Bari"}).toList();
        List<String> email = Arrays.stream(new String[]{"gmail.com", "hotmail.it", "yahoo.it", "libero.it", "outlook.it"}).toList();
        List<String> nomiTorneiScacchi = Arrays.stream(new String[]{"Festival", "Torneo", "Campionato", "Memorial", "Coppa"}).toList();
        // genero qualche utente:
        List<Utente> utenti = new ArrayList<>();
        for(String n: nomi){
            for(String c: cognomi){
                Utente utente = new Utente();
                utente.setNome(n);
                utente.setCognome(c);
                utente.setUsername(n+c);
                utente.setPassword(BCrypt.hashpw(n, BCrypt.gensalt()));
                Random random = new Random();
                utente.setNazionalita((new String[]{"it", "en", "fr", "de", "es"})[random.nextInt(5)]);
                utente.setDataNascita(generaDataNascitaCasuale());
                utente.setEmail(n+"."+c+"@"+email.get(random.nextInt(email.size())));
                utenti.add(utente);
                DBManager.getInstance().getUtenteDao().saveOrUpdate(utente);
            }
        }
        // genero qualche amicizia
        for(int i=0;i<300;i++){
            Utente u1 = utenti.get(new Random().nextInt(utenti.size()));
            Utente u2 = utenti.get(new Random().nextInt(utenti.size()));
            while(u1.getUsername().equals(u2.getUsername()) || DBManager.getInstance().getUtenteDao().getFollower(u1).contains(u2)){
                u2 = utenti.get(new Random().nextInt(utenti.size()));
            }
            DBManager.getInstance().getUtenteDao().segui(u1, u2);
            DBManager.getInstance().getUtenteDao().accettaRichiesta(u1, u2);
        }
        // genero qualche admin
        for(int i=0;i<10;i++){
            Utente u = utenti.get(new Random().nextInt(utenti.size()));
            while(u.isAdmin()){
                u = utenti.get(new Random().nextInt(utenti.size()));
            }
            u.setAdmin(true);
            DBManager.getInstance().getUtenteDao().saveOrUpdate(u);
        }
        // genero qualche torneo
        List<Torneo> tornei = new ArrayList<>();
        for(int i=0;i<20;i++){
            String cittaTorneo = citta.get(new Random().nextInt(citta.size()));
            String nome = nomiTorneiScacchi.get(new Random().nextInt(nomiTorneiScacchi.size()))+" di " + cittaTorneo + " " + (new Random().nextInt(20)+1) + "° edizione";
            Date dataInizio = Date.from(LocalDate.now().plusDays(new Random().nextInt(30)).atStartOfDay(ZoneId.systemDefault()).toInstant());
            Date dataFine = Date.from(LocalDate.now().plusDays(new Random().nextInt(30)+30).atStartOfDay(ZoneId.systemDefault()).toInstant());
            Torneo torneo = new TorneoProxy(DBManager.getInstance().getConnection());
            torneo.setNome(nome);
            torneo.setLuogo(cittaTorneo);
            torneo.setDataInizio(dataInizio);
            torneo.setDataFine(dataFine);
            torneo.setStato("prossimo");
            tornei.add(torneo);
            DBManager.getInstance().getTorneoDao().saveOrUpdate(torneo);
        }
        // genero qualche iscrizione a qualche torneo
        for(int i=0;i<200;i++){
            Torneo t = tornei.get(new Random().nextInt(tornei.size()));
            while(t.getPartecipanti().size() >= 15){
                t = tornei.get(new Random().nextInt(tornei.size()));
            }
            Utente u = utenti.get(new Random().nextInt(utenti.size()));
            while(t.getPartecipanti().contains(u)){
                u = utenti.get(new Random().nextInt(utenti.size()));
            }
            DBManager.getInstance().getTorneoDao().addPartecipante(t, u);
        }
        // inizializzo qualche torneo
        for(int i=0;i<5;i++){
            Torneo t = tornei.get(new Random().nextInt(tornei.size()));
            while (t.getStato().equals("inCorso") || t.getNumeroPartecipanti() < 3) {
                t = tornei.get(new Random().nextInt(tornei.size()));
            }
            t.setStato("inCorso");
            TorneoModel.generaPartite( (int) t.getId());
            DBManager.getInstance().getTorneoDao().saveOrUpdate(t);
        }
    }

    public static Date generaDataNascitaCasuale() {
        // Ottieni la data attuale
        LocalDate oggi = LocalDate.now();

        // Genera un numero casuale tra 16 e 56
        Random random = new Random();
        int eta = random.nextInt(41) + 16;

        // Sottrai l'età casuale dalla data attuale per ottenere la data di nascita
        return Date.from(oggi.minusYears(eta).atStartOfDay(ZoneId.systemDefault()).toInstant());
    }
}