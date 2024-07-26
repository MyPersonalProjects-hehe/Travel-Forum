import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Database } from '@angular/fire/database';
import { Router } from '@angular/router';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { BehaviorSubject } from 'rxjs';

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
      await signOut(this.fireauth);
      this.router.navigate(['/login']);
    } catch (error) {
      throw error;
    }
  }

  isLoggedIn() {
    this.user$.subscribe((user) => (this.currentUser = user));
    return this.currentUser;
  }
}
