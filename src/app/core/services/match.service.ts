import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AdopterMatch, ShelterIncomingLike } from "../../shared/components/models/match.model";


@Injectable({
  providedIn: 'root',
})
export class MatchService {
    
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/match`;

    

    getMyLikes(): Observable<AdopterMatch[]> {
        return this.http.get<AdopterMatch[]>(`${this.apiUrl}/my-likes`);
    }

    GetShelterIncoming() : Observable<ShelterIncomingLike[]> {
        return this.http.get<ShelterIncomingLike[]>(`${this.apiUrl}/shelter-incoming`);
    }

    sendDecision(matchId: string, approve: boolean): Observable<{ message: string }> {
        return this.http.put<{ message: string }>(`${this.apiUrl}/${matchId}/decision`, { approve });
    }
}