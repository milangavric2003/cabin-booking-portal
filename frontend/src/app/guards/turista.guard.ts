import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const turistaGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const user = JSON.parse(localStorage.getItem('loggedUser') || 'null');

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  if (user.tip != 'turista') {
    router.navigate([`/${user.tip}`]);
    return false;
  }

  return true;
};
