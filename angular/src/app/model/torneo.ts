import { Utente } from "./utente";

export interface Torneo {
    id: number;
    numeroPartecipanti: number;
    nome: string;
    luogo: string;
    dataInizio: Date;
    dataFine: Date;
    stato: string;
    vincitore: Utente;
}

export interface TorneoForm {
    nome: string;
    luogo: string;
    dataInizio: Date;
    dataFine: Date;
    numeroPartecipanti: number;
    stato: string;
}
