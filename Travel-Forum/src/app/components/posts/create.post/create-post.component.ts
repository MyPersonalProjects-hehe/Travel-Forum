import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePost {
  userId: any = null;
  post: any = {
    title: '',
    description: '',
    shortDescription: '',
    userEmail: '',
  };

  constructor(private auth: AuthService, private userService: UserService) {}

  async submitPost() {
    this.auth.user$.subscribe((user) => {
      this.post.userEmail = user?.email;
      this.userId = user?.uid;
    });
    await this.userService.uploadPost(this.userId, this.post);
    console.log(this.post);
  }
}
