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
      const postsRef = await (await get(ref(this.db, `posts`))).val();
      const commentsToUpdate: any[] = [];

      Object.entries(postsRef).forEach(([postId, post]: [string, any]) => {
        if (post.comments) {
          Object.entries(post.comments).forEach(
            ([commentId, comment]: [string, any]) => {
              if (comment.createdBy === username) {
                commentsToUpdate.push({
                  post: postId,
                  comment: commentId,
                  avatar: avatar,
                  user: username,
                });
              }
            }
          );
        }
      });

      for (const comment of commentsToUpdate) {
        await update(
          ref(this.db, `posts/${comment.post}/comments/${comment.comment}`),
          {
            avatar: avatar,
          }
        );
      }
      await update(ref(this.db, `users/${username}`), {
        avatar: avatar,
      });
    } catch (error) {
      throw error;
    }
  }
}
