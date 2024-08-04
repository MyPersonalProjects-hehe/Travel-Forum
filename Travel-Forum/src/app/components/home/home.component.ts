import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { onValue, ref } from 'firebase/database';
import { Database } from '@angular/fire/database';
import { PostComponent } from '../posts/post/post.component';
import { BlockComponent } from '../block/block.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [NgFor, NgIf, PostComponent, BlockComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  currentUser: any = null;
  posts$: any = null;
  UserInfo: any = [
    `Your profile info`,
    `Date of register : ${0}`,
    `calendar`,
    `Number of friends : ${0}`,
    `user`,
  ];
  PostsInfo: any = [
    `Statistics for posts`,
    `Number of uploaded posts : ${0}`,
    `number`,
    `Likes : ${0}`,
    `heart`,
  ];

  constructor(private auth: AuthService, private db: Database) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => (this.currentUser = user));
    const userRef = ref(this.db, `posts/${this.currentUser?.uid}`);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.posts$ = Object.entries(data).map(([id, post]) => ({
          id,
          post,
        }));
      }
    });
  }
}
