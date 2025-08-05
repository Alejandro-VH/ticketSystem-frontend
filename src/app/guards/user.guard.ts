import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
  const router = inject(Router);
  try {
    if (user) {
      const userRole = JSON.parse(user).role_id;
      if (userRole === 3) {
        return true;
      }
    }
  } catch (error) {
    console.warn('userGuard error:', error);
  }
  router.navigate(['/login']);
  return false;
};
