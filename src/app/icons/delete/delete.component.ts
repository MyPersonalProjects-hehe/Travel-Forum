import { Component, Input } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'delete',
  standalone: true,
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss',
})
export class DeleteComponent {
  @Input() post: any;
  constructor(private postService: PostService) {}

  async toggleDelete() {
    await this.postService.deletePost(this.post);
  }
}
