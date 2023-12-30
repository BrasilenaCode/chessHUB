import { Torneo } from "./torneo";
import { Utente } from "./utente";

export interface Partita {
    giocatore1: Utente;
    giocatore2: Utente;
    data: Date;
    torneo: Torneo;
    turno: number;
}
