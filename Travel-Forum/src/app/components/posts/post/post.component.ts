import { AuthService } from './../../../services/auth.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LikeComponent } from '../../../icons/like/like.component';
import { UserService } from '../../../services/user.service';
import { DislikeComponent } from '../../../icons/like/dislike/dislike.component';
import { Router } from '@angular/router';

@Component({
  selector: 'post',
  standalone: true,
  imports: [NgIf, LikeComponent, NgClass, NgFor, DislikeComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  @Input() post: any;
  @Input() userId: any;
  @Input() showFullView: boolean = false;
  user: any = null;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private route: Router
  ) {}

  async likePost(post: any) {
    this.auth.user$.subscribe((user) => (this.user = user));
    await this.userService.likePost(post, this.userId);
  }

  async dislike() {
    await this.userService.dislikePost(this.post, this.userId);
  }

  showFullPost(navigationPath: string) {
    this.showFullView = !this.showFullView;

    if (navigationPath === 'home') {
      this.route.navigate(['home']);
    } else {
      this.route.navigate([`/fullViewPost/${navigationPath}`]);
    }
  }
}
