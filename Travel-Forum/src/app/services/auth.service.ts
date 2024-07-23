import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { Database } from '@angular/fire/database';
import { Router } from '@angular/router';
import { ref, set } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo: any = '';
  constructor(
    private fireauth: Auth,
    private router: Router,
    private db: Database
  ) {}

  async login(email: string, password: string) {
    if (email && password) {
      await signInWithEmailAndPassword(this.fireauth, email, password)
        .then(() => {
          alert('Successfully logging');
        })
        .catch((err) => alert(err));
    }
  }

  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.fireauth,
        email,
        password
      );
      alert('Successfully registered');
      this.userInfo = userCredential.user;
      return userCredential.user;
    } catch (err) {
      alert(err);
      throw err;
    }
  }

  async createUser(username: string) {
    const userRef = ref(this.db, `users/${username}`);

    await set(userRef, {
      username: username,
      email: this.userInfo.email,
      uid: this.userInfo.uid,
    });
  }
}
