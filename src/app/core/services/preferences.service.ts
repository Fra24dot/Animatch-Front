import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserPreferences } from '../../shared/components/models/preferences.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  private http = inject(HttpClient);
  
  private apiUrl = `${environment.apiUrl}/UserProfile/my-preferences`;

  
  getMyPreferences(): Observable<UserPreferences> {
    return this.http.get<UserPreferences>(this.apiUrl);
  }

  
  saveMyPreferences(preferences: UserPreferences): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, preferences);
  }
}