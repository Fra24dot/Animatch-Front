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
  private readonly router = inject(Router);

  // Vérifie si l'utilisateur est connecté
  isLogged = computed(() => this.authService.connectedUser() !== null);

  // Extrait le rôle de l'utilisateur ('Admin', 'User', 'Shelter', etc.)
  // On utilise StringComparison implicite en TS en vérifiant la valeur exacte
  isAdmin = computed(() => {
    const payload = this.authService.connectedUser();
    return payload?.accountType === 'Admin';
  });

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }
}
