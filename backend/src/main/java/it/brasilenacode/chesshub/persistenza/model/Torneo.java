package it.brasilenacode.chesshub.persistenza.model;

import java.util.Date;
import java.util.List;
import java.util.Map;

// classe che rappresenta un torneo
public class Torneo {
    // attributi
    private long id;
    private int numeroPartecipanti;
    private String nome;
    private String luogo;
    private Date dataInizio;
    private Date dataFine;
    private String stato;
    private Utente vincitore;
    private List<Utente> partecipanti;
    private Map<String, Integer> punteggi;
    // costruttore
    public Torneo() {
    }
    // metodi get e set
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public int getNumeroPartecipanti() {
        return numeroPartecipanti;
    }
    public void setNumeroPartecipanti(int numeroPartecipanti) {
        this.numeroPartecipanti = numeroPartecipanti;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getLuogo() {
        return luogo;
    }
    public void setLuogo(String luogo) {
        this.luogo = luogo;
    }
    public Date getDataInizio() {
        return dataInizio;
    }
    public void setDataInizio(Date dataInizio) {
        this.dataInizio = dataInizio;
    }
    public Date getDataFine() {
        return dataFine;
    }
    public void setDataFine(Date dataFine) {
        this.dataFine = dataFine;
    }
    public String getStato() {
        return stato;
    }
    public void setStato(String stato) {
        this.stato = stato;
    }
    public Utente getVincitore() {
        return vincitore;
    }
    public void setVincitore(Utente vincitore) {
        this.vincitore = vincitore;
    }
    public List<Utente> getPartecipanti() {
        return partecipanti;
    }
    public void setPartecipanti(List<Utente> partecipanti) {
        this.partecipanti = partecipanti;
    }
    public Map<String, Integer> getPunteggi() {
        return punteggi;
    }
    public void setPunteggi(Map<String, Integer> punteggi) {
        this.punteggi = punteggi;
    }
    // metodo per aggiungere un partecipante
    public void addPartecipante(Utente u){
        // se non ho ancora caricato i partecipanti
        if(partecipanti == null){
            // li carico
            getPartecipanti();
        }
        // aggiungo il partecipante
        this.numeroPartecipanti++;
        this.partecipanti.add(u);
    }

    // metodo per rimuovere un partecipante
    public void removePartecipante(Utente utente) {
        // se non ho ancora caricato i partecipanti
        if(partecipanti == null){
            // li carico
            getPartecipanti();
        }
        // se il partecipante è presente
        if(partecipanti.contains(utente)){
            // lo rimuovo
            partecipanti.remove(utente);
            // aggiorno il numero di partecipanti
            this.numeroPartecipanti--;
        }
    }
    // metodo per settare i parametri di un utente
    public void setAll(int id, String nome, String luogo, Date dataInizio, Date dataFine, String stato, Utente vincitore, int numeroPartecipanti){
        this.id = id;
        this.nome = nome;
        this.luogo = luogo;
        this.dataInizio = dataInizio;
        this.dataFine = dataFine;
        this.stato = stato;
        this.vincitore = vincitore;
        this.numeroPartecipanti = numeroPartecipanti;
    }
}
