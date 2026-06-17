import { Component, inject, OnInit, signal } from '@angular/core';
import { MatchService } from '../../../core/services/match.service';
import { AdopterMatch } from '../../../shared/components/models/match.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adopter-like',
  imports: [],
  templateUrl: './adopter-like.html',
  styleUrl: './adopter-like.scss',
})
export class AdopterLike implements OnInit {
  private matchService = inject(MatchService);
   private router = inject(Router);

  myLikes = signal<AdopterMatch[]>([]);
  isLoading = signal<boolean>(true);

  
  ngOnInit(): void {
    this.matchService.getMyLikes().subscribe({
      next: (data) => {
        this.myLikes.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

}
