export interface UtenteRegistrazione{
    nome:string;
    cognome:string;
    username:string;
    password:string;
    nazionalita:string;
    dataNascita:Date;
    punteggio:number
    admin:boolean;
    punteggioSettimanale:number;
    email: string;
}

export interface Utente{
  nome:string;
  cognome:string;
  username:string;
  nazionalita:string;
  dataNascita:Date;
  punteggio:number
  admin:boolean;
  punteggioSettimanale:number;
  email: string;
}

export interface UtenteLogin{
    username:string;
    password:string;
}

export interface AuthToken{
    token:string;
}
