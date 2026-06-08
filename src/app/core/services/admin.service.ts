import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Shelter } from '../../shared/components/models/shelter.model'; 

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/admin`;

  // Récupérer les refuges en attente
  getPendingShelters(): Observable<Shelter[]> {
    return this.http.get<Shelter[]>(`${this.apiUrl}/pending-shelters`);
  }

  // Approuver un refuge
  approveShelter(id: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/approve-shelter/${id}`, {});
  }

  // Refuser un refuge
  rejectShelter(id: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/reject-shelter/${id}`, {});
  }
}