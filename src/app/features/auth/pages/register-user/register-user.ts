import { Component, signal, inject } from '@angular/core'; 
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { PawBackground } from '../../../../shared/components/paw-background/paw-background';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { passwordMatchValidator } from '../../../../shared/validators/password-validator';
import { AuthService } from '../../../../core/services/auth.service'; 



@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [Navbar, PawBackground, ReactiveFormsModule],
  templateUrl: './register-user.html',
  styleUrl: './register-user.scss',
})
export class RegisterUser {
  
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  currentStep = signal<number>(1);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  form = this.fb.group({
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(250)]],
    birthDate: ['', Validators.required],
    gender: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  }, {
    validators: passwordMatchValidator 
  });

  nextStep() {
    this.currentStep.set(2);
  }

  
  prevStep() {
    this.currentStep.set(1);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    } 
    // On active le loader et on efface les erreurs précédentes
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { confirmPassword, ...registerData } = this.form.value;
    
    this.authService.registerUser(registerData as any).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.isLoading.set(false);
        if (err.status === 409) {
          this.errorMessage.set('Cet email est déjà utilisé.');
        } else {
          this.errorMessage.set('Une erreur est survenue. Veuillez réessayer.');
        }
      }
    });
  }
}



