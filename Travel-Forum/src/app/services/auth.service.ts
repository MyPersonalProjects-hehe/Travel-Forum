import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Database } from '@angular/fire/database';
import { Router } from '@angular/router';
import { signOut } from 'firebase/auth';
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
    try {
      const singedUser = await signInWithEmailAndPassword(
        this.fireauth,
        email,
        password
      );
      alert('Successfully logging');
      this.router.navigate(['/home']);
      return singedUser.user;
    } catch (error) {
      throw error;
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
      this.router.navigate(['/home']);
      this.userInfo = userCredential.user;
      return userCredential.user;
    } catch (err) {
      alert(err);
      throw err;
    }
  }

  async createUser(username: string) {
    try {
      const userRef = ref(this.db, `users/${username}`);
      await set(userRef, {
        username: username,
        email: this.userInfo.email,
        uid: this.userInfo.uid,
      });
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(this.fireauth);
      this.router.navigate(['/login']);
      console.log(this.userInfo);
    } catch (error) {
      throw error;
    }
  }
}
