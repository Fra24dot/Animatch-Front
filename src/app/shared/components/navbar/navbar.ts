import { Component, signal, inject, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
private readonly authService = inject(AuthService);
private router = inject(Router);

  
isLogged = computed(() => this.authService.connectedUser() !== null);
connectedUser = this.authService.connectedUser;

isSurPageHistoire(): boolean {
    return this.router.url === '/histoire';
  }

 

isProfileComplete = this.authService.isProfileComplete;
isPreferencesComplete = this.authService.isPreferencesComplete;
  
  isAdmin = computed(() => {
    const payload = this.authService.connectedUser();
    return payload?.accountType === 'Admin';
  });

  isShelter = computed(() => {
    const payload = this.authService.connectedUser();
    return payload?.accountType === 'Shelter'; 
  });

handleFeedAccess(): void {
    if (!this.isProfileComplete()) {
      this.router.navigate(['/user-profile-form']);
    } else if (!this.isPreferencesComplete()) {
      this.router.navigate(['/preferences']);
    } else {
      this.router.navigate(['/feed']);
    }
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }
}
