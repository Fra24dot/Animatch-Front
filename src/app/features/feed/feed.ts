import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FeedService } from '../../core/services/feed.service';
import { DogFeedResponse } from '../../shared/components/models/dog-feed.model';
import { Navbar } from '../../shared/components/navbar/navbar';
import { PawBackground } from '../../shared/components/paw-background/paw-background';

@Component({
  selector: 'app-feed',
  imports: [Navbar, PawBackground],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed implements OnInit {
  private feedService = inject(FeedService);
  private router = inject(Router);
  
  dogs = signal<DogFeedResponse[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');
  redirectCode = signal<'PROFILE_INCOMPLETE' | 'PREFERENCES_MISSING' | null>(null);

  
  currentDog = computed(() => {
    const list = this.dogs();
    return list.length > 0 ? list[0] : null;
  });

  

  ngOnInit(): void {
    this.loadFeed();
  }

  
  loadFeed(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.redirectCode.set(null);

    this.feedService.getFeed().subscribe({
      next: (data) => {
        this.dogs.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        
        
        if (err.code === 'PROFILE_INCOMPLETE' || err.code === 'PREFERENCES_MISSING') {
          this.redirectCode.set(err.code);
          this.errorMessage.set(err.message);
        } else {
          this.errorMessage.set(err.message || 'Impossible de charger le feed.');
        }
      }
    });
  }

  
  onSwipe(isLike: boolean): void {
    const activeDog = this.currentDog();
    if (!activeDog) return;

    const dogId = activeDog.id;

    this.feedService.postInteraction({ dogId, isLike }).subscribe({
      next: () => {
       
        this.dogs.update(currentList => {
          const newList = [...currentList];
          newList.shift();
          return newList;
        });
      },
      error: (err) => {
        console.error("Erreur lors de l'enregistrement de l'interaction :", err);
      }
    });
  }

  
  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

 
  goToPreferences(): void {
    this.router.navigate(['/profile/preferences']);
  }
}
