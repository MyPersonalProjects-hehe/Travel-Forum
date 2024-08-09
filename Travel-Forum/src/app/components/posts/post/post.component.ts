import { AuthService } from './../../../services/auth.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LikeComponent } from '../../../icons/like/like.component';
import { UserService } from '../../../services/user.service';
import { DislikeComponent } from '../../../icons/like/dislike/dislike.component';
import { Router } from '@angular/router';
import { RouterService } from '../../../services/router.service';
import { CommentComponent } from '../../../icons/comment/comment.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'post',
  standalone: true,
  imports: [
    NgIf,
    LikeComponent,
    NgClass,
    NgFor,
    DislikeComponent,
    CommentComponent,
    FormsModule,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
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

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private route: Router,
    private routeService: RouterService
  ) {}

  async likePost(post: any) {
    await this.userService.likePost(post, this.userId);
  }

  async dislike() {
    await this.userService.dislikePost(this.post, this.userId);
  }

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
  }

  showFullPost(navigationPath: string) {
    if (navigationPath === this.previousNavPath) {
      this.route.navigate([this.previousNavPath]);
    } else {
      this.route.navigate([`/fullViewPost/${navigationPath}`]);
    }
  }

  async submitComment() {
    await this.userService.uploadComment(
      this.comment,
      this.post.id,
      this.userId
    );
  }

  toggleComment() {
    this.showComment = !this.showComment;
  }
}
