import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { UserLogin } from '../../../../shared/components/models/auth.model';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { PawBackground } from '../../../../shared/components/paw-background/paw-background';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Navbar, PawBackground, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  errorMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  onSubmit(): void {
    if (this.form.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.login(this.form.value as UserLogin)
      .subscribe({
        next: () => {
          this.isLoading.set(false);

          // Récupère le rôle de l'utilisateur connecté pour l'aiguiller
          const accountType = this.authService.connectedUser()?.accountType;

          if (accountType === 'Admin') {
            this.router.navigate(['/admin-shelter-validation']);
          } else if (accountType === 'Shelter') {
            this.router.navigate(['/shelter']);
          } else {
            this.router.navigate(['/user-profile-form']);
          }
        },
        error: (err) => {
          this.isLoading.set(false);
          if (err.status === 401) {
            this.errorMessage.set('Email ou mot de passe incorrect');
          } else {
            this.errorMessage.set('Une erreur est survenue, réessayez plus tard');
          }
        }
      });
  }
}
