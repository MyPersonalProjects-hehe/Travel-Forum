import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'like',
  standalone: true,
  imports: [NgIf],
  templateUrl: './like.component.html',
  styleUrl: './like.component.scss',
})
export class LikeComponent {
  @Input() isLiked: any;
  @Input() post: any;
  @Input() userId: any;

  constructor(private userService: UserService) {}

  async likePost() {
    await this.userService.likePost(this.post, this.userId);
  }

  async dislikePost() {
    await this.userService.dislikePost(this.post, this.userId);
  }
}
