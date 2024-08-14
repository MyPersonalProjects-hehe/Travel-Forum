import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { AuthService } from '../../../services/auth.service';
import { onValue, ref } from 'firebase/database';
import { Database } from '@angular/fire/database';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'allPosts',
  standalone: true,
  imports: [PostComponent, NgFor, NgIf],
  templateUrl: './all.posts.component.html',
  styleUrl: './all.posts.component.scss',
})
export class AllPostsComponent implements OnInit {
  currentUser: any;
  posts$: any;
  constructor(private auth: AuthService, private db: Database) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => (this.currentUser = user));
    const postsRef = ref(this.db, `posts`);

    onValue(postsRef, (snapshot) => {
      this.posts$ = snapshot.val();
      if (this.posts$) {
        this.posts$ = Object.entries(this.posts$).map(([id, post]) => ({
          id,
          post,
        }));
      }
    });
  }
}
