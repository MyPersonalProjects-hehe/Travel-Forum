// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: Auth, private router: Router) {}

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.fireauth, email, password)
      .then(() => {
        alert('Successfully logging');
      })
      .catch((err) => alert(err));
  }

  register(email: string, password: string) {
    createUserWithEmailAndPassword(this.fireauth, email, password)
      .then((userCredential) => {
        console.log(userCredential);

        alert('Successfully register');
      })
      .catch((err) => alert(err));
  }
}
