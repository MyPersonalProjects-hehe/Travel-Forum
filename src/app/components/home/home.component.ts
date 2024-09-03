import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { onValue, ref } from 'firebase/database';
import { Database } from '@angular/fire/database';
import { PostComponent } from '../posts/post/post.component';
import { BlockComponent } from './block/block.component';
import { CarouselModule } from 'primeng/carousel';
import { ImageWrapper } from '../image.wrapper/image.wrapper.component';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    PostComponent,
    BlockComponent,
    CarouselModule,
    ImageWrapper,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  currentUser: any = null;
  posts$: any = null;
  UserInfo: string[] = [];
  PostsInfo: string[] = [];
  likes: number = 0;
  comments: number = 0;
  dateOfRegister: string = '';

  constructor(
    private auth: AuthService,
    private db: Database,
    private route: Router
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => (this.currentUser = user));
    const date = Number(this.currentUser?.metadata?.createdAt);
    this.dateOfRegister = new Date(date).toLocaleDateString();

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

        this.likes = this.posts$
          .filter((obj: any) => obj.post.likedBy)
          .map((obj: any) => Object.keys(obj.post.likedBy))
          .flat().length;

        this.comments = this.posts$
          .filter((obj: any) => obj.post.comments)
          .map((obj: any) => Object.keys(obj.post.comments))
          .flat().length;
      } else {
        this.posts$ = [];
      }
    });
  }

  toggleCreatePost() {
    this.route.navigate(['/createPost']);
  }
}
