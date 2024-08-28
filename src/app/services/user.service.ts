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

  async fetchTrendingUsers() {
    try {
      const map = new Map();
      const postsRef = (await get(ref(this.db, `posts`))).val();
      const usersRef = (await get(ref(this.db, `users`))).val();

      if (postsRef) {
        const posts = Object.entries(postsRef).map(([id, post]) => ({
          id,
          post,
        }));

        posts.map((post: any) => {
          const userId = post.post.userId;
          const likedByCount = Object.keys(post.post.likedBy).length || 0;
          const commentsCount = Object.keys(post.post.comments).length || 0;

          if (likedByCount) {
          }
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
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }

  async isUserTrendy(userId: string) {
    const userRef = Object.values((await get(ref(this.db, `users`))).val());
    const user: any = userRef.filter((user: any) => user.uid === userId)[0];
    if (user.trendyUser) {
      return 'You are currently a trendy user!';
    } else {
      return 'Be more active!';
    }
  }
}
