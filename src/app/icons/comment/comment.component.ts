import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'comment',
  standalone: true,
  imports: [NgIf],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements OnInit {
  @Input() post: any;
  countOfComments: any;

  ngOnInit() {
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
}
