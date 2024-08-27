import { AuthService } from './../../../services/auth.service';
import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LikeComponent } from '../../../icons/like/like.component';
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
import { DeleteComponent } from '../../../icons/delete/delete.component';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'post',
  standalone: true,
  imports: [
    NgIf,
    LikeComponent,
    CommentComponent,
    FormsModule,
    BookmarkHeartComponent,
    ToastModule,
    DeleteComponent,
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
  isLiked: boolean = false;

  constructor(
    private postService: PostService,
    private auth: AuthService,
    private route: Router,
    private routeService: RouterService,
    private db: Database,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => (this.user = user));
    this.previousNavPath = this.routeService.previousRoute;

    onValue(ref(this.db, `posts/${this.post?.id}/likedBy`), (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const userIds = Object.keys(data);
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
      await this.postService.uploadComment(
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
