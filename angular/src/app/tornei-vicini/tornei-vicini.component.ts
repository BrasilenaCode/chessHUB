import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TorneoService } from '../services/torneo.service';
import { Torneo } from '../model/torneo';

@Component({
  selector: 'app-tornei-vicini',
  templateUrl: './tornei-vicini.component.html',
  styleUrl: './tornei-vicini.component.css'
})
export class TorneiViciniComponent implements OnInit {
torneoSuccessivo: any;
torneoPrecedente() {
throw new Error('Method not implemented.');
}
  constructor(private http: HttpClient, private torneoService: TorneoService) {}

  options = {
    icon: '../../assets/foto/map-pin-solid.svg',
    scaledSize: new google.maps.Size(40, 40)
  }


location1: string = '';
distance: number = 0;
show: boolean = false;
tornei = new Map();
listOfLocations = new Map();

listToShow: { key: string, value: boolean }[] = [];


ngOnInit(): void {
  this.torneoService.dammiTornei().subscribe(tornei => {
    tornei.forEach(torneo => {
      if (torneo.stato === 'prossimo') {
        console.log(torneo.id)
        this.tornei.set(torneo.id, torneo);
        this.listOfLocations.set(torneo.id, false);
      }
    })
    this.listToShow = Array.from(this.listOfLocations, ([key, value]) => ({ key, value }))
  });
}

display: any;
displayDest: any;
center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
zoom = 7;

moveMap(event: google.maps.MapMouseEvent) {
  if (event.latLng != null) this.center = (event.latLng.toJSON());
}

move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
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
      if (iamhere) {
        this.display = { lat: location.lat, lng: location.lng };
        this.center = this.display;
      } else {
        console.log("chiamata")
        this.displayDest = { lat: location.lat, lng: location.lng };
        this.center = this.displayDest;
        this.show = true;
      }
    }
  });
}

searchLocation() {
  if (this.location1 != '') {
    this.markLocation(this.location1, true)
    this.calculateDistance()
  }
}



calculateDistanceBetweenLocations(position1: google.maps.LatLngLiteral, position2: google.maps.LatLngLiteral): number {
  const latLng1 = new google.maps.LatLng(position1.lat, position1.lng);
  const latLng2 = new google.maps.LatLng(position2.lat, position2.lng);
  return (google.maps.geometry.spherical.computeDistanceBetween(latLng1, latLng2))/1000;
}

calculateDistance() {
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
              console.log("distanza da " + torneo.luogo + ": " + calculatedDistance)
              if (this.distance >= calculatedDistance) {
                console.log("siiii")
                this.listOfLocations.set(toCheck, true);
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
}
}
