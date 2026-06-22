import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { PawBackground } from "../../../shared/components/paw-background/paw-background";

@Component({
  selector: 'app-user-dashboard',
  imports: [Navbar, PawBackground,],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss',
})
export class UserDashboard implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  
  profileData = signal<any>(null);
  preferencesData = signal<any>(null);
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);

  ngOnInit(): void {
    this.loadFullProfile();
  }

  loadFullProfile(): void {
    this.isLoading.set(true);
    const baseUrl = `${environment.apiUrl}`;

    
    forkJoin({
      profile: this.http.get(`${baseUrl}/userprofile/my-profile`), 
      preferences: this.http.get(`${baseUrl}/userprofile/my-preferences`)
    }).subscribe({
      next: (res) => {
        this.profileData.set(res.profile);
        this.preferencesData.set(res.preferences);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error("Erreur lors du chargement du récapitulatif", err);
        this.isLoading.set(false);
      }
    });
  }

  
  modifierFormulaire() { this.router.navigate(['/user-profile-form']); }
  modifierPreferences() { this.router.navigate(['/preferences']); }
}
