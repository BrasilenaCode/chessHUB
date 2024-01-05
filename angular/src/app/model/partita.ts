import { Torneo } from "./torneo";
import { Utente } from "./utente";

export interface Partita {
    id: number;
    giocatore1: Utente;
    giocatore2: Utente;
    data: Date;
    torneo: Torneo;
    turno: number;
    esito: string;
    pgn: string;
    privacy: string;
}
