import { Component, Input } from '@angular/core';

@Component({
  selector: 'post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  @Input() post: any;
}
