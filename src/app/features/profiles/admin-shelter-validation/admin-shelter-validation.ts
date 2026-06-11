import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { Shelter } from '../../../shared/components/models/shelter.model';
import { PawBackground } from '../../../shared/components/paw-background/paw-background';
import { Navbar } from '../../../shared/components/navbar/navbar';


@Component({
  selector: 'app-admin-shelter-validation',
  imports: [PawBackground,  Navbar, ],
  templateUrl: './admin-shelter-validation.html',
  styleUrl: './admin-shelter-validation.scss',
})
export class AdminShelterValidation implements OnInit{
private readonly http = inject(HttpClient);
private readonly adminService = inject(AdminService);


shelters = signal<Shelter[]>([]);
isLoading = signal<boolean>(false);
errorMessage = signal<string | null>(null);


  ngOnInit(): void {
   this.loadPendingShelters();
  }


  loadPendingShelters(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.adminService.getPendingShelters().subscribe({
      next: (data) => {
        this.shelters.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Erreur lors du chargement des refuges en attente.');
        this.isLoading.set(false);
      }
    });
  }

  validateShelter(id: string): void {
    this.adminService.approveShelter(id).subscribe({
      next: (response) => {
        // Supprime de la liste locale si le back a validé
        this.shelters.update(list => list.filter(s => s.id !== id));
        alert(response.message || 'Le chenil a été validé !');
      },
      error: (err) => {
        console.error(err);
        alert('Impossible de valider le refuge.');
      }
    });
  }

  rejectShelter(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir refuser cette demande d’inscription ?')) {
      this.adminService.rejectShelter(id).subscribe({
        next: (response) => {
          this.shelters.update(list => list.filter(s => s.id !== id));
          alert(response.message || 'Le refuge a été refusé.');
        },
        error: (err) => {
          console.error(err);
          alert('Impossible de refuser le refuge.');
        }
      });
    }
  }

}
