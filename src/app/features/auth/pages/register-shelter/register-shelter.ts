import { Component, signal, inject } from '@angular/core'; 
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { PawBackground } from '../../../../shared/components/paw-background/paw-background';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { passwordMatchValidator } from '../../../../shared/validators/password-validator';
import { AuthService } from '../../../../core/services/auth.service';
import { ShelterRegister } from '../../../../shared/components/models/auth.model';

@Component({
  selector: 'app-register-shelter',
  imports: [Navbar, PawBackground, ReactiveFormsModule],
  templateUrl: './register-shelter.html',
  styleUrl: './register-shelter.scss',
})
export class RegisterShelter {
private readonly fb = inject(FormBuilder);
private readonly router = inject(Router);
private readonly authService = inject(AuthService);

  currentStep = signal<number>(1);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    companyNumber: ['', [Validators.required, Validators.maxLength(50)]],
    creationYear: [new Date().getFullYear(), [Validators.required, Validators.min(1800), Validators.max(new Date().getFullYear())]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(20)]],
    address: ['', [Validators.required, Validators.maxLength(250)]],
    city: ['', [Validators.required, Validators.maxLength(100)]],
    postalCode: ['', [Validators.required, Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(250)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    confirmPassword: ['', Validators.required],
  },
  {
    validators: passwordMatchValidator 
  });

  nextStep() {
  if (this.currentStep() < 3) {
    this.currentStep.update(step => step + 1);
  }
}

prevStep() {
  if (this.currentStep() > 1) {
    this.currentStep.update(step => step - 1);
  }
}

 onSubmit() {
    if (this.form.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null); 

    
    const { confirmPassword, ...payload } = this.form.value;
    
    
    this.authService.registerShelter(payload as ShelterRegister).subscribe({
      next: () => {
        this.isLoading.set(false);
        console.log('Refuge enregistré avec succès !');
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        this.isLoading.set(false);
        
        if (err.error?.message) {
          this.errorMessage.set(err.error.message);
        } else {
          this.errorMessage.set("Une erreur est survenue lors de l'inscription. Veuillez rééssayer.");
        }
        console.error('Erreur inscription :', err);
      }
    });
  }
}
