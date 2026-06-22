import { Component, inject, OnInit, signal } from '@angular/core';
import { MatchService } from '../../../core/services/match.service';
import { AdopterMatch } from '../../../shared/components/models/match.model';
import { Router } from '@angular/router';
import { PawBackground } from '../../../shared/components/paw-background/paw-background';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-adopter-like',
  imports: [Navbar, PawBackground],
  templateUrl: './adopter-like.html',
  styleUrl: './adopter-like.scss',
})
export class AdopterLike implements OnInit {
  private matchService = inject(MatchService);
  private router = inject(Router);

  myLikes = signal<AdopterMatch[]>([]);
  isLoading = signal<boolean>(true);
  

  
    ngOnInit(): void {
    this.myLikes.set([]);
    this.isLoading.set(true);

    this.matchService.getMyLikes().subscribe({
      next: (data) => {
        if (data) {
          const uniqueMatches = Array.from(
            new Map(data.map(item => [item.matchId, item])).values()
          );
          
          this.myLikes.set(uniqueMatches);
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

}
