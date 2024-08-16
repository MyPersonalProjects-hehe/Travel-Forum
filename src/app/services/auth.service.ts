import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Database, get } from '@angular/fire/database';
import { Router } from '@angular/router';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { BehaviorSubject } from 'rxjs';
import { validateRegister } from './validations';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo: any = '';
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser: any = null;

  constructor(
    private fireauth: Auth,
    private router: Router,
    private db: Database
  ) {
    onAuthStateChanged(this.fireauth, (user) => {
      this.user$.next(user);
    });
  }

  async login(email: string, password: string) {
    try {
      const singedUser = await signInWithEmailAndPassword(
        this.fireauth,
        email,
        password
      );

      this.router.navigate(['/home']);

      return singedUser.user;
    } catch (error) {
      throw error;
    }
  }

  async register(email: string, password: string, username: string) {
    try {
      const usersRef = Object.keys((await get(ref(this.db, `users`))).val());
      validateRegister(email, username, usersRef);

      const userCredential = await createUserWithEmailAndPassword(
        this.fireauth,
        email,
        password
      );
      this.userInfo = userCredential.user;
      this.router.navigate(['/home']);
      return userCredential.user;
    } catch (err: any) {
      if (err.message.includes('auth/email-already-in-use')) {
        throw new Error('Email is already in use!');
      }
      if (err.message.includes('auth/weak-password')) {
        throw new Error(
          'Weak password! Password should be at least 6 characters!'
        );
      }

      throw err;
    }
  }

  async createUser(username: string, avatar: string) {
    try {
      const userRef = ref(this.db, `users/${username}`);
      await set(userRef, {
        username: username,
        email: this.userInfo.email,
        uid: this.userInfo.uid,
        avatar: avatar,
        myPosts: {
          uid: '',
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      this.router.navigate([this.router.url]).then(() => {
        window.location.reload();
      });

      await signOut(this.fireauth);
    } catch (error) {
      throw error;
    }
  }

  isLoggedIn() {
    this.user$.subscribe((user) => (this.currentUser = user));
    return this.currentUser;
  }
}
