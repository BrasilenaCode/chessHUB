import { Torneo } from "./torneo";
import { Utente } from "./utente";

export interface Partita {
    id: number;
    vincitore: Utente;
    perdente: Utente;
    data: Date;
    torneo: Torneo;
}