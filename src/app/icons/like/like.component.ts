import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { PostService } from '../../services/post.service';

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

  constructor(private postService: PostService) {}

  async likePost() {
    await this.postService.likePost(this.post, this.userId);
  }

  async dislikePost() {
    await this.postService.dislikePost(this.post, this.userId);
  }
}
