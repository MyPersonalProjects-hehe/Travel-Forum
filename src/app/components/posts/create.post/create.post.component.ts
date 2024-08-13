import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './create.post.component.html',
  styleUrl: './create.post.component.css',
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
    private rout: Router
  ) {}

  async submitPost() {
    this.auth.user$.subscribe((user) => {
      this.post.userEmail = user?.email;
      this.post.userId = user?.uid;
    });
    await this.userService.uploadPost(this.post);
    this.post = {};
    this.rout.navigate(['/home']);
  }
}
