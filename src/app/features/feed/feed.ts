import { Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FeedService } from '../../core/services/feed.service';
import { DogFeedResponse } from '../../shared/components/models/dog-feed.model';
import { Navbar } from '../../shared/components/navbar/navbar';
import { PawBackground } from '../../shared/components/paw-background/paw-background';
import { MatchService } from '../../core/services/match.service';

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
  
  private startX = 0;
  private currentX = 0;
  isDragging = signal<boolean>(false);

  cardTransform = computed(() => {
    if (!this.isDragging() && this.currentX === 0) return 'none';
    const deltaX = this.currentX - this.startX;
    const rotation = deltaX * 0.05; 
    return `translateX(${deltaX}px) rotate(${rotation}deg)`;
  });

  cardTransition = computed(() => {
    return this.isDragging() ? 'none' : 'transform 0.3s ease-out';
  });

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
        
        const errorCode = err.code;
        const errorMsg = err.message;

        if (errorCode === 'PROFILE_INCOMPLETE' || errorCode === 'PREFERENCES_MISSING') {
          this.redirectCode.set(errorCode);
          this.errorMessage.set(errorMsg || 'Redirection vers votre profil...');
          
          
          this.goToProfileDashboard();
        } else {
          this.errorMessage.set(errorMsg || 'Impossible de charger le feed.');
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

  startSwipe(event: MouseEvent | TouchEvent): void {
    
    if ((event.target as HTMLElement).closest('.card-actions') || (event.target as HTMLElement).closest('.card-footer')) return;

    this.isDragging.set(true);
    this.startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.currentX = this.startX;
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:touchmove', ['$event'])
  moveSwipe(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging()) return;
    this.currentX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
  }

  @HostListener('window:mouseup')
  @HostListener('window:touchend')
  endSwipe(): void {
    if (!this.isDragging()) return;
    this.isDragging.set(false);

    const deltaX = this.currentX - this.startX;
    const swipeThreshold = 140;

    if (deltaX > swipeThreshold) {
      this.onSwipe(true);  
    } else if (deltaX < -swipeThreshold) {
      this.onSwipe(false); 
    }

    this.startX = 0;
    this.currentX = 0;
  }

  
  goToProfileDashboard(): void {
    this.router.navigate(['/mon-profil']);
  }
}