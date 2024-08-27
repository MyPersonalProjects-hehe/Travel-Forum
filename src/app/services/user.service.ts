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

  async fetchTrendingUsers() {
    try {
      const map = new Map();
      const postsRef = (await get(ref(this.db, `posts`))).val();
      const usersRef = (await get(ref(this.db, `users`))).val();

      const posts = Object.entries(postsRef).map(([id, post]) => ({
        id,
        post,
      }));

      posts.map((post: any) => {
        const userId = post.post.userId;
        const likedByCount = Object.keys(post.post.likedBy).length || 0;
        const commentsCount = Object.keys(post.post.comments).length || 0;
        const user = Object.values(usersRef).filter(
          (user: any) => user.uid === userId
        );

        if (map.has(userId)) {
          map.set(userId, {
            likes: map.get(userId).likes + likedByCount,
            comments: map.get(userId).comments + commentsCount,
            user: user[0],
          });
        } else {
          map.set(userId, {
            likes: likedByCount,
            comments: commentsCount,
            user: user[0],
          });
        }
      });
      const trendy = [...map.values()].sort(
        (a: any, b: any) => b.likes - a.likes
      );
      const [first, second, third] = trendy;
      return {
        first,
        second,
        third,
      };
    } catch (error) {
      throw error;
    }
  }
}
