import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Torneo } from '../model/torneo';
import { TorneoService } from '../services/torneo.service';
import { UtentiService } from '../services/utenti.service';
import { Utente } from '../model/utente';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})

export class MapsComponent implements OnChanges {

  @Input() torneo?: Torneo;
  /*
    se showEntirely è vera mostra solo la mappa con il luogo del torneo pinnato,
    se falsa mostra tutta quanta la view per ricercare tornei vicini
  */
  @Input() showEntirely: boolean = false;  

  constructor(private http: HttpClient,
     private torneoService: TorneoService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.searchLocation()
  }

  displayDest: any;         // per gestire visualizzare la posizione del torneo vicino che si vuole visualizzare
  display: any;             // per gestire visualizzare la propria posizione attuale
  defaultCenter: google.maps.LatLngLiteral = {lat: 41.8719, lng: 12.5674}; // coordinate ITALIA
  center: google.maps.LatLngLiteral = this.defaultCenter;
  showMap: boolean = false; // serve per mostrare <google-map> (vera se il luogo cercato esiste)
  zoom = 6;
  options = {}              // serve ad app-marker per settare un'icona personalizzata come marker
  location1: string = '';   // stringa che identifica la posizione attuale
  distance: number = 0; 
  showError: boolean = false;
  errorMessage: string = '';
  displayDefault: boolean = true; // se vera, viene mostrata la posizione di default sulla mappa (defaultCenter)
  tornei = new Map();             // coppia <chiave torneo | torneo>
  listOfLocations = new Map();    // coppia <chiave torneo | boolean (per mostrarlo o meno)>
  listToShow: { key: string, value: boolean }[] = [];   // array perché non si può iterare sulle mappe nell'html :(
  atLeastOneTournament: boolean = false;    // serve per determinare se almeno un torneo vicino esiste

  utente?: Utente;


  ngOnInit(): void {
    try{
      this.options = {
        icon: '../../assets/foto/map-pin-solid.svg',
        scaledSize: new google.maps.Size(40, 40),
      };
    } catch(e){}
    // prendo tutti i tornei solo se devo cercare quelli vicini
    if (this.showEntirely) {
      this.torneoService.dammiTornei().subscribe(tornei => {
        tornei.forEach(torneo => {
          if (torneo.stato === 'prossimo') {
            this.tornei.set(torneo.id, torneo);
            this.listOfLocations.set(torneo.id, false);
          }
        })
        this.listToShow = Array.from(this.listOfLocations, ([key, value]) => ({ key, value }))
      });
    }
  }


  raiseError(messageToShow: string) {
    this.showError = true;
    this.errorMessage = messageToShow;
    this.center = this.defaultCenter;
    this.zoom = 5; 
    this.displayDefault = true;
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  getGeocoding(place: string) {
    const apiKey = 'AIzaSyB8ar3GNTtk6U9ZGGhLNVDUAikh0On1AAo'
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(place)}&key=${apiKey}`;
    return this.http.get(apiUrl)
  }

  markLocation(place: string, iamhere: boolean) {
    this.getGeocoding(place).subscribe((response: any) => {
      let location: any;
      if (response.results.length > 0 && response.results[0].geometry != undefined) {
        location = response.results[0].geometry.location;
      
        // iamhere serve per inizializzare il giusto marker
        if (iamhere) {
          this.display = { lat: location.lat, lng: location.lng };
          this.center = this.display;
        } else {
          this.displayDest = { lat: location.lat, lng: location.lng };
          this.center = this.displayDest;
        }
        this.displayDefault = false;
        this.zoom = 10;
        this.showMap = true;
      } else {
        this.showMap = false;
        this.raiseError("Errore nel caricamento della mappa.")
      }
    });
  }

  searchLocation() {
    this.showError = false;
    if (!this.showEntirely) {
      if (this.torneo != undefined) {
        this.markLocation(this.torneo.luogo, false)
      }
    } else {
      if (this.location1 != '') {
        this.markLocation(this.location1, true)
        this.calculateDistance()
      }
    }
  }

  calculateDistanceBetweenLocations(position1: google.maps.LatLngLiteral, position2: google.maps.LatLngLiteral): number {
    const latLng1 = new google.maps.LatLng(position1.lat, position1.lng);
    const latLng2 = new google.maps.LatLng(position2.lat, position2.lng);
    return (google.maps.geometry.spherical.computeDistanceBetween(latLng1, latLng2))/1000;
  }

  calculateDistance() {
    this.atLeastOneTournament = false;
    // sostanzialmente: itero per ogni torneo, prima mi prendo le coordinate della mia posizione
    // poi quella dell'n-esimo torneo, calcolo la distanza tra i due luoghi e controllo che rientri
    // nel range specificato dall'utente
    for (const [toCheck, torneo] of this.tornei.entries()) {
      if (this.location1 && toCheck) {
        this.getGeocoding(this.location1).subscribe((response1: any) => {
          if (response1.results.length > 0 && response1.results[0].geometry != undefined) {
            const location1 = response1.results[0].geometry.location;
            this.getGeocoding(torneo.luogo).subscribe((response2: any) => {
              if (response2.results.length > 0 && response2.results[0].geometry != undefined) {
                const location2 = response2.results[0].geometry.location;
                const calculatedDistance = parseFloat(
                  this.calculateDistanceBetweenLocations(
                    { lat: location1.lat, lng: location1.lng },
                    { lat: location2.lat, lng: location2.lng }
                  ).toFixed(2)
                );
                if (this.distance >= calculatedDistance) {
                  this.listOfLocations.set(toCheck, true);
                  this.atLeastOneTournament = true;
                  this.showError = false;
                } else {
                  this.listOfLocations.set(toCheck, false);
                }
                this.listToShow = Array.from(this.listOfLocations, ([key, value]) => ({ key, value }));
              }
            });
          }
        });
      }
    }
    if (!this.atLeastOneTournament) {
      // se nessun torneo vicino viene trovato, setto l'array con tutti false
      // (altrimenti i tornei vicini precedentemente trovati rimarrebbero visualizzati nell'html,
      // anche se la ricerca non ha dato nessun risultato o se la posizione attuale non esiste)
      this.listToShow = Array.from(this.listOfLocations, ([key, value]) => ({ key, value: false }));
      this.raiseError("Non è stato trovato nessun torneo.")
    }
  }

}
