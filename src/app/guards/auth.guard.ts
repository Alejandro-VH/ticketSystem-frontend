import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
  
export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const router = inject(Router);

  if (!token || !user || token === undefined || user === undefined || token === '' || user === '') {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
