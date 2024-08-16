import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { onValue, ref } from 'firebase/database';
import { Database } from '@angular/fire/database';
import { PostComponent } from '../posts/post/post.component';
import { BlockComponent } from '../block/block.component';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'home',
  standalone: true,
  imports: [NgFor, NgIf, PostComponent, BlockComponent, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  currentUser: any = null;
  posts$: any = null;
  UserInfo: any = [];
  PostsInfo: any = [];
  usersWhoLiked: any = [];

  constructor(private auth: AuthService, private db: Database) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => (this.currentUser = user));
    const date = Number(this.currentUser.metadata.createdAt);
    const dateOfRegister = new Date(date).toLocaleDateString();

    const postsRef = ref(this.db, `posts`);
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.posts$ = Object.entries(data)
          .map(([id, post]) => ({
            id,
            post,
          }))
          .filter((obj: any) => obj.post.userId === this.currentUser.uid);
      }

      const likes = this.posts$
        .filter((obj: any) => obj.post.likedBy)
        .map((obj: any) => Object.keys(obj.post.likedBy))
        .flat().length;

      this.UserInfo.push(
        `Your profile info`,
        `Date of register : ${dateOfRegister}`,
        `calendar`,
        `Number of friends : ${0}`,
        `user`
      );
      this.PostsInfo.push(
        `Statistics for posts`,
        `Number of uploaded posts : ${this.posts$?.length || 0}`,
        `number`,
        `Likes : ${likes || 0}`,
        `heart`
      );
    });
  }
}
