import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const vlasnikGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
  
    const user = JSON.parse(localStorage.getItem('loggedUser') || 'null');
  
    if (!user) {
      router.navigate(['/login']);
      return false;
    }
  
    if (user.tip != 'vlasnik') {
      router.navigate([`/${user.tip}`]);
      return false;
    }
  
    return true;
};
