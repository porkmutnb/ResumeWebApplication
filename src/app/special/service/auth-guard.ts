import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(Auth);
  const isLogin = authService.isLoggedIn();

  if (isLogin == false) {
    router.navigate(['/special/login']); // Redirect to login if not authenticated
  }
  return isLogin;
};
