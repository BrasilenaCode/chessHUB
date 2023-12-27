package it.brasilenacode.chesshub.persistenza.model;

import java.util.Date;

public class Partita {

    private long id;
    private Utente vincitore;
    private Utente perdente;
    private Date data;
    private Torneo torneo;

    public Partita() {
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
    public Utente getVincitore() {
        return vincitore;
    }

    public void setVincitore(Utente vincitore) {
        this.vincitore = vincitore;
    }

    public Utente getPerdente() {
        return perdente;
    }

    public void setPerdente(Utente perdente) {
        this.perdente = perdente;
    }

    public Torneo getTorneo() {
        return torneo;
    }

    public void setTorneo(Torneo torneo) {
        this.torneo = torneo;
    }
}
