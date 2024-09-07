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
import { validateLogin, validateRegister } from './validations';

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
      validateLogin(email, password);
      const singedUser = await signInWithEmailAndPassword(
        this.fireauth,
        email,
        password
      );

      this.router.navigate(['/home']);

      return singedUser.user;
    } catch (error: any) {
      if (error.message.includes('(auth/invalid-credential)')) {
        throw new Error('Wrong email or password!');
      }
      throw error;
    }
  }

  async register(email: string, password: string, username: string) {
    try {
      const usersRef = (await get(ref(this.db, `users`))).val();
      if (usersRef) {
        const users = Object.keys(usersRef);
        validateRegister(email, username, users);
      }

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
}
