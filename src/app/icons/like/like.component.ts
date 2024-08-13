import { Component, Input } from '@angular/core';

@Component({
  selector: 'like',
  standalone: true,
  imports: [],
  templateUrl: './like.component.html',
  styleUrl: './like.component.css',
})
export class LikeComponent {
  @Input() isLiked: any;
}
