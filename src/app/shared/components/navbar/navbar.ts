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

  // 🌟 On se branche directement sur le signal du service !
  isLogged = computed(() => this.authService.connectedUser() !== null);

  logout(): void {
    // 1. On appelle le logout du service pour nettoyer les tokens et le localStorage
    this.authService.logout();
    
    // 2. On redirige proprement vers l'accueil public
    this.router.navigate(['/welcome']);
  }
}
