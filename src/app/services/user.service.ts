import { Injectable } from '@angular/core';
import { Database, get, ref, update } from '@angular/fire/database';
import { validateAvatar } from './validations';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: Database) {}

  async changeUserAvatar(username: string, avatar: string) {
    try {
      validateAvatar(avatar);
      await update(ref(this.db, `users/${username}`), {
        avatar: avatar,
      });
    } catch (error) {
      throw error;
    }
  }
}
