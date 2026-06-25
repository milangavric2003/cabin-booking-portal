import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const user = JSON.parse(localStorage.getItem('loggedUser') || 'null');

  if (!user) {
    router.navigate(['/admin-login']);
    return false;
  }

  if (user.tip != 'admin') {
    router.navigate([`/${user.tip}`]);
    return false;
  }

  return true;
};
