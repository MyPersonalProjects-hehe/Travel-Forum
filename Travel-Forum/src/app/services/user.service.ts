import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$: Observable<User | null> | undefined;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }
}
