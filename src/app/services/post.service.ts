import { Injectable } from '@angular/core';
import { get, push, ref, remove, set, update } from 'firebase/database';
import { Database } from '@angular/fire/database';
import { validatePost } from './validations';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private db: Database) {}

  async deletePost(post: any) {
    try {
      const postRef = ref(this.db, `posts/${post.id}`);
      await remove(postRef);
    } catch (error) {
      throw error;
    }
  }

  async uploadPost(post: object) {
    try {
      validatePost(post);
      const dataRef = ref(this.db, `posts`);
      await push(dataRef, post);
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
      const usersRef = (await get(ref(this.db, `users`))).val();
      const usernameObj: any = Object.values(usersRef).filter(
        (userObj: any) => userObj.uid === userId
      );
      const username = usernameObj[0].username;
      const userRef = ref(this.db, `users/${username}/likedPosts`);
      await remove(postRef);
      await remove(userRef);
    } catch (error) {
      throw error;
    }
  }

  async uploadComment(comment: string, postId: any, userId: any) {
    try {
      const postRef = ref(this.db, `posts/${postId}/comments`);
      const userRef = await get(ref(this.db, `users`));
      const snapshot = userRef.val();
      const userObject: any = Object.values(snapshot).filter(
        (userObj: any) => userObj.uid === userId
      );
      const username = userObject[0].username;
      const avatar = userObject[0].avatar;

      const data: any = {
        createdOn: Date.now(),
        likes: 0,
        createdBy: username,
        comment: comment,
        avatar: avatar,
      };

      if (comment.length <= 3 || !comment) {
        throw new Error('Comment must be more than 3 characters!');
      }

      await push(postRef, data);
    } catch (error) {
      throw error;
    }
  }
}
