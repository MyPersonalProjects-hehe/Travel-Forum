import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { uploadPostError, uploadPostSuccess } from '../../../services/toast';
import { PostService } from '../../../services/post.service';
import { Database, get, ref } from '@angular/fire/database';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [FormsModule, RouterOutlet, ToastModule],
  providers: [MessageService],
  templateUrl: './create.post.component.html',
  styleUrl: './create.post.component.scss',
})
export class CreatePost {
  user: any = null;
  post: any = {
    title: '',
    description: '',
    shortDescription: '',
    userEmail: '',
    image: '',
    likedBy: 0,
    userId: '',
    comments: '',
  };

  constructor(
    private auth: AuthService,
    private postService: PostService,
    private messageService: MessageService,
    private db: Database
  ) {
    this.auth.user$.subscribe((user) => (this.user = user));
  }

  async submitPost() {
    try {
      const userRef = (await get(ref(this.db, `users`))).val();
      const user: any = Object.values(userRef).filter(
        (user: any) => user.uid === this.user.uid
      )[0];

      this.post['userAvatar'] = user.avatar;
      this.post.userEmail = user.email;
      this.post.userId = user.uid;
      await this.postService.uploadPost(this.post);
      this.messageService.add(uploadPostSuccess);
      this.post = {};
    } catch (error: any) {
      this.messageService.add(uploadPostError(error));
    }
  }
}
