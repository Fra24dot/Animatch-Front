import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserProfileRequest } from '../../shared/components/models/userProfile.model';
import { AuthService } from './auth.service';

export interface UserProfileResponse extends UserProfileRequest {
  userId: string;
  accountCompleted: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = `${environment.apiUrl}/UserProfile`;
  private profileState = signal<UserProfileResponse | null>(null);
  public readonly profile = this.profileState.asReadonly();
  public readonly isAccountCompleted = computed(() => this.profileState()?.accountCompleted ?? false);
  private readonly http = inject(HttpClient);
  private authService = inject(AuthService);

  loadProfile(): void {
    this.http.get<UserProfileResponse>(this.apiUrl).subscribe({
      next: (profileData) => {
        
        this.profileState.set(profileData);

        this.authService.updateProfileStatus(profileData.accountCompleted);
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil', err);
        this.profileState.set(null);
      }
    });
  }

  saveProfile(profileData: UserProfileRequest): void {
    this.http.put<UserProfileResponse>(this.apiUrl, profileData).subscribe({
      next: (updatedProfile) => {
        this.profileState.set(updatedProfile);
        
        this.authService.updateProfileStatus(updatedProfile.accountCompleted);
      },
      error: (err) => console.error('Erreur de sauvegarde', err)
    });
  }

  clearProfile(): void {
    this.profileState.set(null);
  }
}