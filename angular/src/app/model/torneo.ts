import { Utente } from "./utente";

export interface Torneo {
    id: number;
    numeroPartecipanti: number;
    luogo: string;
    dataInizio: Date;
    dataFine: Date;
    stato: string;
    vincitore: Utente;
}