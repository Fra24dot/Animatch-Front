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
  private apiUrl = `${environment.apiUrl}/feed`;

 private readonly http = inject(HttpClient);

  getFeed(): Observable<DogFeedResponse[]> {
    return this.http.get<DogFeedResponse[]>(this.apiUrl).pipe(
      catchError(this.handleError) 
    );
  }

  postInteraction(body: { dogId: string; isLike: boolean }): Observable<any> {
  return this.http.post(`${environment.apiUrl}/match/interaction`, body);
}

  
 private handleError(error: HttpErrorResponse) {
    
    if (error.error) {
      return throwError(() => error.error);
    }
    return throwError(() => ({ code: 'SERVER_ERROR', message: 'Une erreur serveur est survenue.' }));
  }
}