package it.brasilenacode.chesshub.persistenza.model;

import java.util.Date;

public class Partita {

    private long id;
    private Utente giocatore1;
    private Utente giocatore2;
    private Date data;
    private Torneo torneo;
    private int turno;
    private String esito;

    public Partita() {
    }
    public Partita(Torneo torneo, Utente giocatore1, Utente giocatore2, Date data, String esito, int turno){
        this.torneo = torneo;
        this.giocatore1 = giocatore1;
        this.giocatore2 = giocatore2;
        this.data = data;
        this.esito = esito;
        this.turno = turno;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public Date getData() {
        return data;
    }

    public Utente getGiocatore1() {
        return giocatore1;
    }

    public void setGiocatore1(Utente giocatore1) {
        this.giocatore1 = giocatore1;
    }

    public Utente getGiocatore2() {
        return giocatore2;
    }

    public void setGiocatore2(Utente giocatore2) {
        this.giocatore2 = giocatore2;
    }

    public String getEsito() {
        return esito;
    }

    public void setEsito(String esito) {
        this.esito = esito;
    }

    public void setTurno(int turno){
        this.turno = turno;
    }
    public int getTurno(){
        return turno;
    }

    public Torneo getTorneo() {
        return torneo;
    }

    public void setTorneo(Torneo torneo) {
        this.torneo = torneo;
    }
}
