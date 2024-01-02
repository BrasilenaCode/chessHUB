import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Torneo } from '../model/torneo';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements OnChanges {

  @Input() torneo?: Torneo;

  constructor(private http: HttpClient) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.searchLocation()
  }


  display: any;
  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 10;

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

  markLocation(place: string) {
    this.getGeocoding(place).subscribe((response: any) => {
      const location = response.results[0].geometry.location;
      this.display = { lat: location.lat, lng: location.lng }
      this.center = this.display;
    })
  }

  searchLocation() {
    console.log("ciaooooo il luogo è " + this.torneo?.luogo)
    if (this.torneo != undefined) {
      this.markLocation(this.torneo.luogo)
    }
  }

}
