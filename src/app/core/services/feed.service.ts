import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DogFeedResponse, DogInteractionRequest } from '../../shared/components/models/dog-feed.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private apiUrl = `${environment.apiUrl}/api/feed`;

 private readonly http = inject(HttpClient);

  getFeed(): Observable<DogFeedResponse[]> {
    return this.http.get<DogFeedResponse[]>(this.apiUrl).pipe(
      catchError(this.handleError) // 🌟 On l'utilise ici !
    );
  }

  postInteraction(request: DogInteractionRequest): Observable<any> {
    const body = {
      dogId: request.dogId,
      isLike: request.isLike
    };
    
    return this.http.post(`${this.apiUrl}/interaction`, body).pipe(
      catchError(this.handleError) 
    );
  }

  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 403 && error.error) {
      
      return throwError(() => error.error); 
    }
    return throwError(() => new Error(error.error?.message || 'Une erreur serveur est survenue.'));
  }
}