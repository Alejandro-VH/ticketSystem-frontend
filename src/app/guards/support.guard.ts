import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const supportGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
  const router = inject(Router);
  try {
    if (user) {
      const userRole = JSON.parse(user).role_id;
      if (userRole === 2) {
        return true;
      }
    }
  } catch (error) {
    console.warn('supportGuard error:', error);
  }
  router.navigate(['/login']);
  return false;
};
