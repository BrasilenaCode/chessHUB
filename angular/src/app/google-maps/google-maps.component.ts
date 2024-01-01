import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrl: './google-maps.component.css'
})
export class GoogleMapsComponent implements OnInit {

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
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
    const apiKey = ''
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
    const addressToSearch = 'Catanzaro'
    this.markLocation(addressToSearch)
  }

}
