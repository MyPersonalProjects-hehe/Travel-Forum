import { Injectable } from '@angular/core';
import { push, ref } from 'firebase/database';
import { Database } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: Database) {}

  async uploadPost(userUid: string, post: object) {
    try {
      const dataRef = ref(this.db, `posts/${userUid}`);
      await push(dataRef, post);
    } catch (error) {
      throw error;
    }
  }
}
