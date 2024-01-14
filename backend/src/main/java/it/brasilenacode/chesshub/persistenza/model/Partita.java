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
    private String pgn;

    private String privacy;

    public Partita() {;
    }
    public Partita(Torneo torneo, Utente giocatore1, Utente giocatore2, Date data, String esito, int turno){
        this.torneo = torneo;
        this.giocatore1 = giocatore1;
        this.giocatore2 = giocatore2;
        this.data = data;
        this.esito = esito;
        this.turno = turno;
        pgn = "";
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPrivacy() {
        return privacy;
    }

    public void setPrivacy(String privacy) {
        this.privacy = privacy;
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

    public String getPGN() {
        return pgn;
    }

    public void setMosse(String pgn) {
        this.pgn = pgn;
    }

    public Torneo getTorneo() {
        return torneo;
    }

    public void setTorneo(Torneo torneo) {
        this.torneo = torneo;
    }

    @Override
    public boolean equals(Object o) {
        return o instanceof Partita && ((Partita) o).getGiocatore2().getUsername().equals(this.getGiocatore2().getUsername()) && ((Partita) o).getGiocatore1().getUsername().equals(this.getGiocatore1().getUsername()) && ((Partita) o).getTorneo().getId()==(this.getTorneo().getId());
    }
}
