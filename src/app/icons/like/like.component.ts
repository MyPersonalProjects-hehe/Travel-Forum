import { Component, Input } from '@angular/core';

@Component({
  selector: 'like',
  standalone: true,
  imports: [],
  templateUrl: './like.component.html',
  styleUrl: './like.component.scss',
})
export class LikeComponent {
  @Input() isLiked: any;
}
