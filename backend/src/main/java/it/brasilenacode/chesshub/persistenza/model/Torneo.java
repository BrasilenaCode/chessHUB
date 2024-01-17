package it.brasilenacode.chesshub.persistenza.model;

import it.brasilenacode.chesshub.persistenza.DAO.PartitaDao;
import it.brasilenacode.chesshub.persistenza.DBManager;

import java.util.ArrayList;
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
    // metodo per generare le partite
    public List<Partita> generaPartite(){
        // creo la lista delle partite
        List<Partita> partite=new ArrayList<>();
        // se il numero di partecipanti è dispari
        if(this.getPartecipanti().size()%2 != 0){
            // aggiungo un partecipante fittizio
            Utente riposo = new Utente("__RIPOSO__");
            this.addPartecipante(riposo);
        // se non ho ancora caricato i partecipanti
        } else if(partecipanti == null){
            // li carico
            getPartecipanti();
        }
        // per ogni turno
        PartitaDao partitaDao = DBManager.getInstance().getPartitaDao();
        // per ogni turno
        for(int turno=1;turno < partecipanti.size();turno++){
            // per ogni partecipante
            for(int partecipante=0;partecipante<partecipanti.size()/2;partecipante++){
                // creo la partita
                Date date = new Date(this.getDataInizio().getTime() + (((getDataFine().getTime() - getDataInizio().getTime()) / (partecipanti.size()-1)) * turno));
                Partita partita = new Partita(this, partecipanti.get(partecipante), partecipanti.get(partecipanti.size() - partecipante-1), date, "0", turno);
                // se non è un riposo
                if (!(partita.getGiocatore2().getUsername().equals("__RIPOSO__") || partita.getGiocatore1().getUsername().equals("__RIPOSO__"))) {
                    // aggiungo la partita alla lista
                    partite.add(partita);
                    // salva la partita nel db
                    partitaDao.saveOrUpdate(partita);
                }
            }
            // ruoto i partecipanti
            partecipanti.add(1, partecipanti.remove(partecipanti.size() - 1));
        }
        // ritorno la lista delle partite
        return partite;
    }
    // metodo per trovare le partite
    public List<Partita> trovaPartite() {
        PartitaDao partitaDao = DBManager.getInstance().getPartitaDao();
        // ritorno la lista delle partite, cercandole nel database
        return new ArrayList<>(partitaDao.findAll().stream().filter(partita -> partita.getTorneo().getId() == this.getId()).toList());
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
