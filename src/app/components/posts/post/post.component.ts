import { AuthService } from './../../../services/auth.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LikeComponent } from '../../../icons/like/like.component';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { RouterService } from '../../../services/router.service';
import { CommentComponent } from '../../../icons/comment/comment.component';
import { FormsModule } from '@angular/forms';
import { BookmarkHeartComponent } from '../../../icons/bookmark-heart/bookmark.heart.component';
import { onValue, ref } from 'firebase/database';
import { Database } from '@angular/fire/database';
import { MessageService } from 'primeng/api';
import {
  uploadCommentError,
  uploadCommentSuccess,
} from '../../../services/toast';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'post',
  standalone: true,
  imports: [
    NgIf,
    LikeComponent,
    NgClass,
    NgFor,
    CommentComponent,
    FormsModule,
    BookmarkHeartComponent,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  @Input() post: any;
  @Input() userId: any;
  @Input() showFullView: boolean = false;
  user: any = null;
  previousNavPath: any = null;
  showComment: boolean = false;
  comment: string = '';
  countOfComments: any = 0;
  isLiked: boolean = false;
  likes: any;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private route: Router,
    private routeService: RouterService,
    private db: Database,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => (this.user = user));
    this.previousNavPath = this.routeService.previousRoute;
    const commentsCount: any = [this.post?.post].filter(
      (post: any) => post?.comments
    );

    if (commentsCount.length > 0) {
      this.countOfComments = commentsCount[0];
      this.countOfComments = Object.values(
        this.countOfComments?.comments
      ).length;
    }

    onValue(ref(this.db, `posts/${this.post?.id}/likedBy`), (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const userIds = Object.keys(data);
        const likes = Object.keys(data).length;
        this.likes = likes;

        if (userIds.includes(this.userId)) {
          this.isLiked = true;
        } else {
          this.isLiked = false;
        }
      }
    });
  }

  showFullPost(navigationPath: string) {
    if (navigationPath === this.previousNavPath) {
      this.route.navigate([this.previousNavPath]);
    } else {
      this.route.navigate([`/fullViewPost/${navigationPath}`]);
    }
  }

  async submitComment() {
    try {
      await this.userService.uploadComment(
        this.comment,
        this.post.id,
        this.userId
      );
      this.messageService.add(uploadCommentSuccess);
    } catch (error: any) {
      this.messageService.add(uploadCommentError(error));
    }
  }

  toggleComment() {
    this.showComment = !this.showComment;
  }
}
