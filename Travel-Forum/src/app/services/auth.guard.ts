import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isLoggedIn() !== null ? true : false;
};

export const notAuthGuard: CanActivateFn = () => {
  return inject(AuthService).isLoggedIn() === null ? false : true;
};
