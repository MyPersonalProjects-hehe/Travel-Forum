import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [FormsModule, RouterOutlet, ToastModule],
  providers: [MessageService],
  templateUrl: './create.post.component.html',
  styleUrl: './create.post.component.scss',
})
export class CreatePost {
  userId: any = null;
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
    private userService: UserService,
    private messageService: MessageService
  ) {}

  async submitPost() {
    this.auth.user$.subscribe((user) => {
      this.post.userEmail = user?.email;
      this.post.userId = user?.uid;
    });

    try {
      await this.userService.uploadPost(this.post);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Successfully uploaded post in your home page!',
        life: 3000,
      });
      this.post = {};
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `${error}`,
        life: 3000,
      });
    }
  }
}
