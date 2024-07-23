import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: User | null) {
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.value;
  }
}
