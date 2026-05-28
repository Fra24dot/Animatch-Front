import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserLogin, UserRegister, ShelterRegister } from '../../shared/components/models/auth.model';
import { JwtPayload, TokenInfo } from '../../shared/components/models/jwt.model';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storage = inject(StorageService);

  connectedUser = signal<JwtPayload | null>(null);

  constructor() {
    // Vérifie si un utilisateur était déjà connecté
    this.connectedUser.set(this.storage.getLocal<JwtPayload>('payload') ?? null);
  }

  login(credentials: UserLogin): Observable<TokenInfo> {
    return this.http.post<TokenInfo>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap((tokenInfo: TokenInfo) => this.decodeToken(tokenInfo))
      );
  }

  registerUser(data: UserRegister): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/register/user`, data);
  }

  registerShelter(data: ShelterRegister): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/register/shelter`, data);
  }

  private decodeToken(token: TokenInfo): void {
    const claims = jwtDecode<JwtPayload>(token.token);

    const payload: JwtPayload = {
      sub: claims.sub,
      email: claims.email,
      accountType: claims.accountType,
      exp: claims.exp,
      token: token.token,
    };

    this.connectedUser.set(payload);
    this.storage.setLocal<string>('token', token.token);
    this.storage.setLocal<JwtPayload>('payload', payload);
  }

  logout(): void {
    this.connectedUser.set(null);
    this.storage.removeLocal('token');
    this.storage.removeLocal('payload');
  }

  isLoggedIn(): boolean {
    return this.connectedUser() !== null;
  }
}