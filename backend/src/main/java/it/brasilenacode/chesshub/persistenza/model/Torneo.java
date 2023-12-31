package it.brasilenacode.chesshub.persistenza.model;

import it.brasilenacode.chesshub.persistenza.DAO.PartitaDao;
import it.brasilenacode.chesshub.persistenza.DAO.postgres.PartitaDaoPostgres;
import it.brasilenacode.chesshub.persistenza.DBManager;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Torneo {
    private long id;
    private int numeroPartecipanti;
    private String nome;
    private String luogo;
    private Date dataInizio;
    private Date dataFine;
    private String stato;
    private Utente vincitore;
    private List<Utente> partecipanti;
    public Torneo() {
    }
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

    public void addPartecipante(Utente u){
        if(partecipanti == null){
            getPartecipanti();
        }
        this.numeroPartecipanti++;
        this.partecipanti.add(u);
    }
    public List<Partita> generaPartite(){
        List<Partita> partite=trovaPartite();
        if(this.getPartecipanti().size()%2 != 0){
            Utente riposo = new Utente("__RIPOSO__");
            this.addPartecipante(riposo);
        }else if(partecipanti == null){
            getPartecipanti();
        }
        PartitaDao partitaDao = DBManager.getInstance().getPartitaDao();
        for(int turno=1;turno < partecipanti.size();turno++){
            for(int partecipante=0;partecipante<partecipanti.size()/2;partecipante++){
                Partita partita = new Partita(this, partecipanti.get(partecipante), partecipanti.get(partecipanti.size() - partecipante-1), new Date(), "0", turno);
                if(!partite.contains(partita)) {
                    partite.add(partita);
                    if (!(partita.getGiocatore2().getUsername().equals("__RIPOSO__") || partita.getGiocatore1().getUsername().equals("__RIPOSO__"))) {
                        partitaDao.saveOrUpdate(partita);
                    }
                }
            }
            partecipanti.add(1, partecipanti.remove(partecipanti.size() - 1));
        }
        return partite.stream().filter(partita -> partita.getGiocatore1().getUsername() != "__RIPOSO__" && partita.getGiocatore2().getUsername() != "__RIPOSO__").toList();
    }

    public List<Partita> trovaPartite() {
        PartitaDao partitaDao = DBManager.getInstance().getPartitaDao();
        return new ArrayList<>(partitaDao.findAll().stream().filter(partita -> partita.getTorneo().getId() == this.getId()).toList());
    }
}
