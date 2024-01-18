import { Component } from '@angular/core';
import {FormControl } from "@angular/forms";
import {AuthServiceService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Utente, UtenteRegistrazione} from '../model/utente';
import { UtentiService } from '../services/utenti.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  username = new FormControl();
  password = new FormControl();
  repeatedPassword = new FormControl();
  nome=new FormControl();
  cognome= new FormControl();
  nazionalita=new FormControl();
  dataNascita= new FormControl();
  email = new FormControl();
  errorMessage = "";
  recaptcha: boolean = false;
  buttonText: string = "Avanti";
  nextStep: boolean = false;
  authCode = new FormControl();
  utente!: UtenteRegistrazione;
  continueRegistering!: boolean;
  tries!: number;


  constructor(private auth:AuthServiceService,
    private utentiService: UtentiService,
     private router:Router) {}


  /*
  questa funzione è suddivisa in due step, in modo tale da poter riusare la stessa funzione del (click):
  ~Step 1: 
    il bottone visualizzato è 'Avanti'. Questo vuoldire che si sta compilando il form
    di registrazione perciò si prendono gli input dell'utente, si validano, si controlla il captcha,
    si controlla che le password coincidano, si valida la data di nascita e, prima di passare allo
    step successivo, si controlla che l'username inserito dall'utente non sia presente nel DB: in tal caso,
    l'utente non può andare avanti e deve cambiare l'username. Se l'username è valido il bottone diventa
    'Verifica' e si passa al secondo step.
  ~Step 2: 
    L'utente procede con l'inviare il codice di verifica ricevuto via mail. si hanno tre tentativi:
    il loop di controllo finisce nel caso l'utente raggiunga il numero massimo di tentativi o inserisca il codice
    corretto (o il server restituisca errore). Nel caso il codice sia corretto, viene effettuata
    la registrazione vera e propria dell'utente nel DB.
  */ 
  registrati() {
    if (this.buttonText == 'Avanti') {
      this.utente = {
        username: this.username.value,
        password: this.password.value,
        nome: this.nome.value,
        cognome: this.cognome.value,
        nazionalita: this.findKeyByValue(this.nazionalita.value),
        dataNascita: this.dataNascita.value,
        admin: false,
        punteggio: 0,
        punteggioSettimanale: 0,
        email: this.email.value,
      }
      if(this.sonoValide(this.username, this.password, this.nome, this.cognome, this.nazionalita, this.email)&&this.dataNascita.value!=null) {
        if(!this.recaptcha) {
          this.errorMessage = "Completa il captcha";
          return;
        }
        if (this.password.value == this.repeatedPassword.value) {
            if (new Date(this.dataNascita.value) < new Date()) {
              this.utentiService.dammiUtente(this.utente.username).subscribe(utente => {
                if (utente != null) {
                  this.errorMessage = "Nome utente già in uso.";
                } else {
                  this.utentiService.controllaMail(this.email.value).subscribe(check => {
                    if (!check) {
                      this.errorMessage = 'Mail selezionata già associata ad un account.';
                    } else {
                      this.buttonText = 'Verifica';
                      this.requestAuthCode();
                      this.nextStep = true;
                      this.errorMessage = '';
                    }
                  });
                }
              });
            } else {
              this.errorMessage = "Data di nascita non valida";
            }
          } else {
            this.errorMessage = "Le password non coincidono";
          }
        }else{
          this.errorMessage = "Compila tutti i campi";
      }
      this.tries = 3;
      this.continueRegistering = false;
    } else {
      var code = this.authCode.value;
      if (this.tries > 0 || this.continueRegistering) {
        this.auth.verifyAuthCodeWhenRegistering(code).subscribe(response => {
          console.log(response)
          if (response === "corretto") {
            this.errorMessage = "";
            this.continueRegistering = true;
          } else if (response === "sbagliato") {
            this.tries--;
            this.errorMessage = 'Numero di tentativi rimasti: ' + this.tries;
          } else if (response === "errore") {
            this.errorMessage = 'Si è verificato un errore. Consigliato richiedere un nuovo codice.';
            this.tries = 0;
          } else {
            this.errorMessage = 'Si è verificato un errore nel server.';
          }
          if (this.continueRegistering) {
            this.auth.signIn(this.utente).subscribe(response => {
              if (response) {
                this.auth.setToken(response.token);
                this.router.navigate(["/"]);
              }
              
            });
          }
        });
      } 
      if (this.tries == 0) this.auth.clearUUID();
      
      
      
       
    }
  }

  // richiede un nuovo codice
  requestAuthCode(): void {
    this.auth.getAuthCodeUUID(this.utente.email);
    this.tries = 3;
    this.continueRegistering = false;
  }

  // cerco nella mappa se la nazionalità inserita dall'utente è presente tra i valori
  findKeyByValue (nazionalita:string){
    const keys = Object.keys(this.nationalities);
    for (const key of keys) {
      if (this.nationalities[key] === nazionalita) {
        return key;
      }
    }
    return "undefined"
  }

  goToForm(): void {
    this.buttonText = 'Avanti';
    this.nextStep = false;
  }

  clearErrorMessage() {
    this.errorMessage = "";
  }
  // controlla che nessun campo sia nullo
  sonoValide(...variabili: (FormControl | null)[]): boolean {
    return variabili.every(variabile => variabile?.valid);
  }
  // controlla che il recaptcha sia risolto
  recaptchaResolved(recaptcha: boolean) {
    this.recaptcha = recaptcha;
  }

  protected readonly Object = Object;
  nationalities: { [key: string]: string } = {
    "it": "Italia",
    "ad": "Andorra",
    "ae": "Emirati Arabi Uniti",
    "af": "Afghanistan",
    "ag": "Antigua e Barbuda",
    "ai": "Anguilla",
    "al": "Albania",
    "am": "Armenia",
    "ao": "Angola",
    "aq": "Antartide",
    "ar": "Argentina",
    "as": "Samoa Americane",
    "at": "Austria",
    "au": "Australia",
    "aw": "Aruba",
    "ax": "Isole Åland",
    "az": "Azerbaigian",
    "ba": "Bosnia ed Erzegovina",
    "bb": "Barbados",
    "bd": "Bangladesh",
    "be": "Belgio",
    "bf": "Burkina Faso",
    "bg": "Bulgaria",
    "bh": "Bahrein",
    "bi": "Burundi",
    "bj": "Benin",
    "bl": "Saint-Barthélemy",
    "bm": "Bermuda",
    "bn": "Brunei",
    "bo": "Bolivia",
    "bq": "Bonaire, Sint Eustatius e Saba",
    "br": "Brasile",
    "bs": "Bahamas",
    "bt": "Bhutan",
    "bv": "Isola Bouvet",
    "bw": "Botswana",
    "by": "Bielorussia",
    "bz": "Belize",
    "ca": "Canada",
    "cc": "Isole Cocos",
    "cd": "Repubblica Democratica del Congo",
    "cf": "Repubblica Centrafricana",
    "cg": "Congo",
    "ch": "Svizzera",
    "ci": "Costa d'Avorio",
    "ck": "Isole Cook",
    "cl": "Cile",
    "cm": "Camerun",
    "cn": "Cina",
    "co": "Colombia",
    "cr": "Costa Rica",
    "cu": "Cuba",
    "cv": "Capo Verde",
    "cw": "Curaçao",
    "cx": "Isola Christmas",
    "cy": "Cipro",
    "cz": "Repubblica Ceca",
    "de": "Germania",
    "dj": "Gibuti",
    "dk": "Danimarca",
    "dm": "Dominica",
    "do": "Repubblica Dominicana",
    "dz": "Algeria",
    "ec": "Ecuador",
    "ee": "Estonia",
    "eg": "Egitto",
    "eh": "Sahara Occidentale",
    "er": "Eritrea",
    "es": "Spagna",
    "et": "Etiopia",
    "fi": "Finlandia",
    "fj": "Figi",
    "fk": "Isole Falkland",
    "fm": "Micronesia",
    "fo": "Isole Fær Øer",
    "fr": "Francia",
    "ga": "Gabon",
    "gb": "Regno Unito",
    "gd": "Grenada",
    "ge": "Georgia",
    "gf": "Guyana Francese",
    "gg": "Guernsey",
    "gh": "Ghana",
    "gi": "Gibilterra",
    "gl": "Groenlandia",
    "gm": "Gambia",
    "gn": "Guinea",
    "gp": "Guadalupa",
    "gq": "Guinea Equatoriale",
    "gr": "Grecia",
    "gs": "Georgia del Sud e Isole Sandwich del Sud",
    "gt": "Guatemala",
    "gu": "Guam",
    "gw": "Guinea-Bissau",
    "gy": "Guyana",
    "hk": "Hong Kong",
    "hm": "Isole Heard e McDonald",
    "hn": "Honduras",
    "hr": "Croazia",
    "ht": "Haiti",
    "hu": "Ungheria",
    "id": "Indonesia",
    "ie": "Irlanda",
    "il": "Israele",
    "im": "Isola di Man",
    "in": "India",
    "io": "Territorio Britannico dell'Oceano Indiano",
    "iq": "Iraq",
    "ir": "Iran",
    "is": "Islanda",
    "je": "Jersey",
    "jm": "Giamaica",
    "jo": "Giordania",
    "jp": "Giappone",
    "ke": "Kenya",
    "kg": "Kirghizistan",
    "kh": "Cambogia",
    "ki": "Kiribati",
    "km": "Comore",
    "kn": "Saint Kitts e Nevis",
    "kp": "Corea del Nord",
    "kr": "Corea del Sud",
    "kw": "Kuwait",
    "ky": "Isole Cayman",
    "kz": "Kazakistan",
    "la": "Laos",
    "lb": "Libano",
    "lc": "Santa Lucia",
    "li": "Liechtenstein",
    "lk": "Sri Lanka",
    "lr": "Liberia",
    "ls": "Lesotho",
    "lt": "Lituania",
    "lu": "Lussemburgo",
    "lv": "Lettonia",
    "ly": "Libia",
    "ma": "Marocco",
    "mc": "Monaco",
    "md": "Moldavia",
    "me": "Montenegro",
    "mf": "Saint Martin",
    "mg": "Madagascar",
    "mh": "Isole Marshall",
    "mk": "Macedonia del Nord",
    "ml": "Mali",
    "mm": "Myanmar",
    "mn": "Mongolia",
    "mo": "Macao",
    "mp": "Isole Marianne Settentrionali",
    "mq": "Martinica",
    "mr": "Mauritania",
    "ms": "Montserrat",
    "mt": "Malta",
    "mu": "Mauritius",
    "mv": "Maldive",
    "mw": "Malawi",
    "mx": "Messico",
    "my": "Malesia",
    "mz": "Mozambico",
    "na": "Namibia",
    "nc": "Nuova Caledonia",
    "ne": "Niger",
    "nf": "Isola Norfolk",
    "ng": "Nigeria",
    "ni": "Nicaragua",
    "nl": "Paesi Bassi",
    "no": "Norvegia",
    "np": "Nepal",
    "nr": "Nauru",
    "nu": "Niue",
    "nz": "Nuova Zelanda",
    "om": "Oman",
    "pa": "Panama",
    "pe": "Perù",
    "pf": "Polinesia Francese",
    "pg": "Papua Nuova Guinea",
    "ph": "Filippine",
    "pk": "Pakistan",
    "pl": "Polonia",
    "pm": "Saint-Pierre e Miquelon",
    "pn": "Isole Pitcairn",
    "pr": "Porto Rico",
    "ps": "Territori Palestinesi",
    "pt": "Portogallo",
    "pw": "Palau",
    "py": "Paraguay",
    "qa": "Qatar",
    "re": "Réunion",
    "ro": "Romania",
    "rs": "Serbia",
    "ru": "Russia",
    "rw": "Ruanda",
    "sa": "Arabia Saudita",
    "sb": "Isole Solomon",
    "sc": "Seychelles",
    "sd": "Sudan",
    "se": "Svezia",
    "sg": "Singapore",
    "sh": "Sant'Elena, Ascensione e Tristan da Cunha",
    "si": "Slovenia",
    "sj": "Svalbard e Jan Mayen",
    "sk": "Slovacchia",
    "sl": "Sierra Leone",
    "sm": "San Marino",
    "sn": "Senegal",
    "so": "Somalia",
    "sr": "Suriname",
    "ss": "Sud Sudan",
    "st": "São Tomé e Príncipe",
    "sv": "El Salvador",
    "sx": "Sint Maarten",
    "sy": "Siria",
    "sz": "Swaziland",
    "tc": "Isole Turks e Caicos",
    "td": "Ciad",
    "tf": "Territori Francesi del Sud",
    "tg": "Togo",
    "th": "Thailandia",
    "tj": "Tagikistan",
    "tk": "Tokelau",
    "tl": "Timor Est",
    "tm": "Turkmenistan",
    "tn": "Tunisia",
    "to": "Tonga",
    "tr": "Turchia",
    "tt": "Trinidad e Tobago",
    "tv": "Tuvalu",
    "tw": "Taiwan",
    "tz": "Tanzania",
    "ua": "Ucraina",
    "ug": "Uganda",
    "um": "Isole minori esterne degli Stati Uniti d'America",
    "us": "Stati Uniti",
    "uy": "Uruguay",
    "uz": "Uzbekistan",
    "va": "Città del Vaticano",
    "vc": "Saint Vincent e Grenadine",
    "ve": "Venezuela",
    "vg": "Isole Vergini Britanniche",
    "vi": "Isole Vergini Americane",
    "vn": "Vietnam",
    "vu": "Vanuatu",
    "wf": "Wallis e Futuna",
    "ws": "Samoa",
    "ye": "Yemen",
    "yt": "Mayotte",
    "za": "Sudafrica",
    "zm": "Zambia",
    "zw": "Zimbabwe"
  };
}


