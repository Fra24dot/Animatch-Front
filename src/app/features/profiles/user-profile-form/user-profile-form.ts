import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfileService } from '../../../core/services/userProfile.service';
import { Router } from '@angular/router';
import { PawBackground } from '../../../shared/components/paw-background/paw-background';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { UserProfileRequest } from '../../../shared/components/models/userProfile.model';

@Component({
  selector: 'app-user-profile-form',
  imports: [Navbar, PawBackground,  ReactiveFormsModule,],
  templateUrl: './user-profile-form.html',
  styleUrl: './user-profile-form.scss',
})
export class UserProfileForm implements OnInit {
  private fb = inject(FormBuilder);
  private profileService = inject(UserProfileService);
  private router = inject(Router);

  public currentStep = signal<number>(1);
  public isLoading = signal<boolean>(false);
  public errorMessage = signal<string | null>(null);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      // Étape 1: Foyer
      city: ['', [Validators.required, Validators.maxLength(100)]],
      housingType: [0, Validators.required], // Reçoit l'entier de l'enum
      peopleCount: [1, [Validators.required, Validators.min(1)]],
      hasChildren: [false],
      petsAllowed: [true],

      // Étape 2: Expérience
      hasAnimals: [false],
      animalsCount: [0, [Validators.required, Validators.min(0)]],
      animalType: [0,Validators.required], 
      alreadyAdopted: [false],
      adoptionPermit: [false],

      // Étape 3: Mode de vie
      jobType: [0, Validators.required], 
      remoteWork: [false],
      dogAloneHours: [0, [Validators.required, Validators.min(0), Validators.max(24)]],
      activeLifestyle: [false],
      financiallyStable: [false]
    });
  }

  nextStep() {
  
  if (this.currentStep() === 1) {
    const cityControl = this.form.get('city');
    const housingControl = this.form.get('housingType');
    const peopleControl = this.form.get('peopleCount');

    
    cityControl?.markAsTouched();
    housingControl?.markAsTouched();
    peopleControl?.markAsTouched();

    
    if (cityControl?.invalid || housingControl?.invalid || peopleControl?.invalid) {
      this.errorMessage.set("Veuillez remplir correctement les informations de votre foyer avant de continuer.");
      return; 
    }
  }

  
  if (this.currentStep() === 2) {
   const step2Valid = this.form.get('animalsCount')?.valid && 
                         this.form.get('animalType')?.valid;
    
   

    if (!step2Valid) {
        this.errorMessage.set("Veuillez vérifier les informations de l'étape 2.");
        return;
      }
  }

  this.errorMessage.set(null);
  
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
    const rawValues = this.form.value;

    const profilePayload: UserProfileRequest = {
      familyCondition: {
        city: rawValues.city,
        housingType: Number(rawValues.housingType),
        peopleCount: rawValues.peopleCount,
        hasChildren: rawValues.hasChildren,
        petsAllowed: rawValues.petsAllowed
      },
      experience: {
        hasAnimals: rawValues.hasAnimals,
        animalsCount: rawValues.animalsCount,
        animalType: Number(rawValues.animalType), 
        alreadyAdopted: rawValues.alreadyAdopted,
        adoptionPermit: rawValues.adoptionPermit
      },
      lifestyle: {
        jobType: Number(rawValues.jobType),
        remoteWork: rawValues.remoteWork,
        dogAloneHours: rawValues.dogAloneHours,
        activeLifestyle: rawValues.activeLifestyle,
        financiallyStable: rawValues.financiallyStable
      }
    };

    
    this.profileService.saveProfile(profilePayload);
    
    this.isLoading.set(false);
    this.router.navigate(['/profile']); 
  }
}
