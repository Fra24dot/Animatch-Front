import { Component, inject, OnInit, signal } from '@angular/core';
import { MatchService } from '../../../core/services/match.service';
import { ShelterIncomingLike } from '../../../shared/components/models/match.model';
import { DatePipe } from '@angular/common';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { PawBackground } from "../../../shared/components/paw-background/paw-background";
import { Router } from '@angular/router';

@Component({
  selector: 'app-shelter-matches',
  imports: [DatePipe, Navbar, PawBackground],
  templateUrl: './shelter-matches.html',
  styleUrl: './shelter-matches.scss',
})
export class ShelterMatches implements OnInit {
  private matchService = inject(MatchService);
   private router = inject(Router);

  incomingLikes = signal<ShelterIncomingLike[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    this.loadIncoming();
  }
 
  loadIncoming() {
    this.isLoading.set(true);
    this.matchService.GetShelterIncoming().subscribe({
      next: (data) => {
        this.incomingLikes.set(data);
        this.isLoading.set(false);
      }
    });
  }

  processMatch(matchId: string, approve: boolean): void {
    this.matchService.sendDecision(matchId, approve).subscribe({
      next: () => {
        this.incomingLikes.update(list => list.filter(m => m.matchId !== matchId));
      }
    });
  }
}