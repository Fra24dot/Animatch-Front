import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ShelterDogService } from '../../../core/services/shelter-dog.service';
import { DogDetailResponse, AddDogRequest } from '../../../shared/components/models/dog.model';
import { PawBackground } from '../../../shared/components/paw-background/paw-background';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dog',
  imports: [ReactiveFormsModule, Navbar, PawBackground, CommonModule],
  templateUrl: './add-dog.html',
  styleUrl: './add-dog.scss',
})
export class AddDog implements OnInit {
   private fb = inject(FormBuilder);
  private shelterDogService = inject(ShelterDogService);
  private router = inject(Router);

  dogForm!: FormGroup;
  selectedFile: File | null = null;

  
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  createdDog = signal<DogDetailResponse | null>(null);
  currentStep = signal<number>(1);

  
  compatibilitiesList = [
    { id: 1, name: 'Bon avec les enfants' },
    { id: 2, name: 'Bon avec les animaux' },
    { id: 3, name: 'Bon avec les inconnus' }
  ];

  medicalHistoriesList = [
    { id: 1, name: 'Allergies' },
    { id: 2, name: 'Vacciné' },
    { id: 3, name: 'Pucé' },
    { id: 4, name: 'Stérilisé' },
    { id: 5, name: 'Problèmes médicaux' }
  ];

  personalitiesList = [
    { id: 1, name: 'Joueur' },
    { id: 2, name: 'Sensible' },
    { id: 3, name: 'Protecteur' },
    { id: 4, name: 'Affectueux' },
    { id: 5, name: 'Indépendant' },
    { id: 6, name: 'Intelligent' },
    { id: 7, name: 'Timide' },
    { id: 8, name: 'Sociable' },
    { id: 9, name: 'Dominant' }
  ];

  specialNeedsList = [
    { id: 1, name: 'Anxiété' },
    { id: 2, name: 'Peur des hommes' },
    { id: 3, name: 'Peur des bruits' }
  ];

  
  races = ['Race pure', 'Croisé / Bâtard'];
  genders = ['Mâle', 'Femelle'];
  ageRanges = ['Chiot', 'Jeune', 'Adulte', 'Sénior'];
  sizes = ['Petit', 'Moyen', 'Grand', 'Très grand (XLarge)'];
  energyLevels = ['Faible', 'Modéré', 'Élevé'];

  ngOnInit(): void {
    this.dogForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      race: ['', Validators.required],         
      description: ['', [Validators.required, Validators.maxLength(500)]],
      gender: ['', Validators.required],       
      ageRange: ['', Validators.required],     
      size: ['', Validators.required],         
      energyLevel: ['', Validators.required],  
      personalityIds: [[]],
      specialNeedsIds: [[]],
      compatibilityIds: [[]],
      medicalHistoryIds: [[]]
    });
  }

  goToStep(step: number): void {
    this.currentStep.set(step);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onCheckboxChange(controlName: string, id: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const currentIds: number[] = this.dogForm.get(controlName)?.value || [];

    if (isChecked) {
      this.dogForm.get(controlName)?.setValue([...currentIds, id]);
    } else {
      this.dogForm.get(controlName)?.setValue(currentIds.filter(x => x !== id));
    }
  }

  onSubmit(): void {
    if (this.dogForm.invalid || this.isLoading()) {
    this.dogForm.markAllAsTouched();
    return;
  }

  this.isLoading.set(true);
  this.errorMessage.set(null);
  this.createdDog.set(null);

  const formValue = this.dogForm.value;

  const requestData: AddDogRequest = {
    name: formValue.name,
    race: +formValue.race,
    description: formValue.description,
    gender: +formValue.gender,
    ageRange: +formValue.ageRange,
    size: +formValue.size,
    energyLevel: +formValue.energyLevel,
    personalityIds: formValue.personalityIds || [],
    specialNeedsIds: formValue.specialNeedsIds || [],
    compatibilityIds: formValue.compatibilityIds || [],
    medicalHistoryIds: formValue.medicalHistoryIds || [],
    mediaFile: this.selectedFile || undefined
  };

  this.shelterDogService.addDog(requestData).subscribe({
    next: (response) => {
      
      this.createdDog.set(response?.dog || response);
      this.isLoading.set(false);
      this.selectedFile = null;
      this.currentStep.set(1);
      
      
      this.dogForm.reset({ 
        name: '',
        description: '',
        race: '', 
        gender: '', 
        ageRange: '', 
        size: '', 
        energyLevel: '',
        personalityIds: [],
        specialNeedsIds: [],
        compatibilityIds: [],
        medicalHistoryIds: []
      });

      
      this.dogForm.markAsPristine();
      this.dogForm.markAsUntouched();
    },
    error: (err) => {
      this.isLoading.set(false);
      const backendError = err.error?.details || err.error?.message || "Une erreur est survenue lors de la sauvegarde.";
      this.errorMessage.set(backendError);
    }
  });
}
}
