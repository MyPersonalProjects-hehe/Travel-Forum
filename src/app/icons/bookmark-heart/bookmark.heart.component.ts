import { Component, Input } from '@angular/core';

@Component({
  selector: 'bookmarkHeart',
  standalone: true,
  imports: [],
  templateUrl: './bookmark.heart.component.html',
})
export class BookmarkHeartComponent {
  @Input() likes: any;
}
