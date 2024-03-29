package it.brasilenacode.chesshub.persistenza.model;
import java.util.Date;

// classe che rappresenta un Utente
public class Utente {
    // attributi
    private String nome;
    private String cognome;
    private String username;
    private String password;
    private String nazionalita;
    private Date dataNascita;
    private int punteggio;
    private int punteggioSettimanale;
    private int follower;
    private boolean admin;
    private String email;

    // costruttore
    public Utente() {}
    // costruttore con parametro username
    public Utente(String username){
        this.username = username;
    }
    // getter e setter
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getCognome() {
        return cognome;
    }
    public void setCognome(String cognome) {
        this.cognome = cognome;
    }
    public int getFollower() {
        return follower;
    }
    public void setFollower(int follower) {
        this.follower = follower;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public int getPunteggioSettimanale() {
        return punteggioSettimanale;
    }
    public void setPunteggioSettimanale(int punteggioSettimanale) {
        this.punteggioSettimanale = punteggioSettimanale;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getNazionalita() {
        return nazionalita;
    }
    public void setNazionalita(String nazionalita) {
        this.nazionalita = nazionalita;
    }
    public Date getDataNascita() {
        return dataNascita;
    }
    public void setDataNascita(Date dataNascita) {
        this.dataNascita = dataNascita;
    }
    public int getPunteggio() {
        return punteggio;
    }
    public void setPunteggio(int punteggio) {
        this.punteggio = punteggio;
    }
    public boolean isAdmin() {
        return admin;
    }
    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // metodo equals
    @Override
    public boolean equals(Object o) {
        return o instanceof Utente && ((Utente) o).getUsername().equals(this.getUsername());
    }
}
