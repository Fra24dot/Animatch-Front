import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private readonly http = inject(HttpClient);

  
  getCoordinatesFromCity(city: string): Observable<Coordinates | null> {
    
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&countrycodes=be&featuretype=settlement&format=json&limit=1`;

    return this.http.get<any[]>(url).pipe(
      map(results => {
        if (results && results.length > 0) {
          return {
            latitude: parseFloat(results[0].lat),
            longitude: parseFloat(results[0].lon)
          };
        }
        return null;
      })
    );
  }
  getCoordinatesFromFullAddress(adresse: string, codePostal: string, ville: string): Observable<Coordinates | null> {
    const fullQuery = `${adresse}, ${codePostal}, ${ville}`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullQuery)}&countrycodes=be&format=json&limit=1`;

    return this.http.get<any[]>(url).pipe(
      map(results => {
        if (results && results.length > 0) {
          return {
            latitude: parseFloat(results[0].lat),
            longitude: parseFloat(results[0].lon)
          };
        }
        return null;
      })
    );
  }

  
}