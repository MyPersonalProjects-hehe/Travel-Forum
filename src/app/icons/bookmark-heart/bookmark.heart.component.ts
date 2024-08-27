import { Component, Input, OnInit } from '@angular/core';
import { Database, onValue, ref } from '@angular/fire/database';

@Component({
  selector: 'bookmarkHeart',
  standalone: true,
  imports: [],
  templateUrl: './bookmark.heart.component.html',
})
export class BookmarkHeartComponent implements OnInit {
  likes: any;
  @Input() postId: any;

  constructor(private db: Database) {}

  ngOnInit() {
    onValue(ref(this.db, `posts/${this.postId}/likedBy`), (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const likes = Object.keys(data).length;
        this.likes = likes;
      }
    });
  }
}
