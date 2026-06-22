import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';

export const feedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  
  if (!authService.isLoggedIn()) {
    router.navigate(['/welcome']);
    return false;
  }

 
  return authService.checkOnboardingStatus().pipe(
    map((status) => {
      if (!status.hasProfile) {
        router.navigate(['/user-profile-form']);
        return false;
      }

      if (!status.hasPreferences) {
        router.navigate(['/preferences']);
        return false;
      }

      return true; 
    }),
    
    catchError(() => {
      router.navigate(['/welcome']);
      return of(false);
    })
  );
};