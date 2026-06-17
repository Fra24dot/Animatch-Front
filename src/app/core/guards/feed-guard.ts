import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const feedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  
  if (!authService.isLoggedIn()) {
    router.navigate(['/welcome']);
    return false;
  }

  
  if (!authService.isProfileComplete()) {
    router.navigate(['/user-profile-form']);
    return false;
  }

 
  if (!authService.isPreferencesComplete()) {
    router.navigate(['/preferences']);
    return false;
  }

  
  return true;
};