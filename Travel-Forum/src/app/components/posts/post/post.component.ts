import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LikeComponent } from '../../../icons/like/like.component';

@Component({
  selector: 'post',
  standalone: true,
  imports: [NgIf, LikeComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  @Input() post: any;
  showFullView: boolean = false;
}
