export interface Utente{
    nome:string;
    cognome:string;
    username:string;
    password:string;
    nazionalita:string;
    dataNascita:Date;
    punteggio:number
    punteggioSettimanale:number
}

export interface UtenteLogin{
    username:string;
    password:string;
}

export interface AuthToken{
    token:string;
}
