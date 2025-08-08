import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLogin = Auth.isLoggedIn();
  if(isLogin==false) {
    router.navigate(['/backoffice/login']);
  }
  return isLogin;
};
