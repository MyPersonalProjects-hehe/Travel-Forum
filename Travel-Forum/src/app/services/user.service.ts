import { Injectable } from '@angular/core';
import { get, push, ref, remove, set, update } from 'firebase/database';
import { Database } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: Database) {}

  async uploadPost(post: object) {
    try {
      const dataRef = ref(this.db, `posts`);
      await push(dataRef, post);
    } catch (error) {
      throw error;
    }
  }

  async likePost(post: any, userId: any) {
    try {
      const userRef = await get(ref(this.db, `users`));
      const updateVal: any = {};
      let userPressingLike: any = Object.values(userRef.val()).filter(
        (obj: any) => obj.uid === userId
      );
      userPressingLike = userPressingLike[0];
      const username = userPressingLike?.username;

      updateVal[`users/${username}/likedPosts/${post.id}`] = true;
      updateVal[`posts/${post.id}/likedBy/${userId}`] = true;
      await update(ref(this.db), updateVal);
    } catch (error) {
      throw error;
    }
  }

  async dislikePost(post: any, userId: any) {
    try {
      const postRef = ref(this.db, `posts/${post.id}/likedBy/${userId}`);
      await remove(postRef);
    } catch (error) {
      throw error;
    }
  }

  async fetchPost(postId: any) {
    try {
      const postsRef = (await get(ref(this.db, `posts/${postId}`))).val();
      const post = {
        id: postId,
        post: postsRef,
      };
      return post;
    } catch (error) {
      throw error;
    }
  }

  async uploadComment(comment: string, postId: any, userId: any) {
    const data: any = {};
    data[userId] = comment;
    try {
      const postRef = ref(this.db, `posts/${postId}/comments`);
      await push(postRef, data);
    } catch (error) {
      throw error;
    }
  }
}
