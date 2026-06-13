import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PreferencesService } from '../../../core/services/preferences.service';
import { UserPreferences } from '../../../shared/components/models/preferences.model';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { PawBackground } from "../../../shared/components/paw-background/paw-background";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preferences',
  imports: [FormsModule, ReactiveFormsModule, Navbar, PawBackground, CommonModule],
  templateUrl: './preferences.html',
  styleUrl: './preferences.scss',
})
export class Preferences implements OnInit {
  private fb = inject(FormBuilder);
  private preferencesService = inject(PreferencesService);

  prefForm!: FormGroup;
  
  
  currentStep = signal<number>(1);

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  
  sizesList = [
    { id: 1, name: 'Petit' },
    { id: 2, name: 'Moyen' },
    { id: 3, name: 'Grand' },
    { id: 4, name: 'Très Grand' }
  ];

  gendersList = [
    { id: 1, name: 'Mâle' },
    { id: 2, name: 'Femelle' }
  ];

  agesList = [
    { id: 1, name: 'Chiot' },
    { id: 2, name: 'Jeune' },
    { id: 3, name: 'Adulte' },
    { id: 4, name: 'Sénior' }
  ];

  energyLevelsList = [
    { id: 1, name: 'Basse' },
    { id: 2, name: 'Modérée' },
    { id: 3, name: 'Élevée' }
  ];

  racesList = [
    { id: 1, name: 'Race pure' },
    { id: 2, name: 'Croisé' }
  ];

  ngOnInit(): void {
    this.prefForm = this.fb.group({
      maxDistance: [50, [Validators.required, Validators.min(5), Validators.max(500)]],
      dogSizeIds: [[]],
      dogGenderIds: [[]],
      dogAgeIds: [[]],
      energyLevelIds: [[]],
      dogRaceIds: [[]]
    });

    this.loadUserPreferences();
  }

  private loadUserPreferences(): void {
  this.isLoading.set(true);
  this.preferencesService.getMyPreferences().subscribe({
    next: (data: UserPreferences) => {
      if (data) {
        this.prefForm.patchValue({
          maxDistance: data.maxDistance || 50,
          dogSizeIds: data.dogSizeIds || [],
          dogGenderIds: data.dogGenderIds || [],
          dogAgeIds: data.dogAgeIds || [],
          energyLevelIds: data.energyLevelIds || [],
          dogRaceIds: data.dogRaceIds || []
        });
      }
      this.isLoading.set(false);
    },
    error: (err) => {
      
      console.log("Aucune préférence existante ou problème de lecture :", err);
      this.isLoading.set(false);
    }
  });
}
  nextStep(): void {
    if (this.currentStep() < 3) {
      this.currentStep.update(step => step + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update(step => step - 1);
    }
  }

  isIdChecked(controlName: string, id: number): boolean {
    const currentValues: number[] = this.prefForm.get(controlName)?.value || [];
    return currentValues.includes(id);
  }

  onCheckboxChange(controlName: string, id: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const currentValues: number[] = this.prefForm.get(controlName)?.value || [];

    if (isChecked) {
      this.prefForm.get(controlName)?.setValue([...currentValues, id]);
    } else {
      this.prefForm.get(controlName)?.setValue(currentValues.filter(v => v !== id));
    }
  }

  onSubmit(): void {
  if (this.prefForm.invalid || this.isLoading()) return;

  this.isLoading.set(true);
  this.errorMessage.set(null); 
  this.successMessage.set(null);

  this.preferencesService.saveMyPreferences(this.prefForm.value).subscribe({
    next: (res) => {
      this.isLoading.set(false);
      this.successMessage.set(res.message);
      this.currentStep.set(1);
    },
    error: (err) => {
      this.isLoading.set(false);
      
      this.errorMessage.set(err.error?.message || "Une erreur est survenue lors de l'enregistrement de vos critères.");
    }
  });
}
}
