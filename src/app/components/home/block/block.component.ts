import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'block',
  standalone: true,
  imports: [NgIf],
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss',
})
export class BlockComponent implements OnChanges {
  @Input() dateOfRegister: string = '';
  @Input() posts$: any;
  @Input() comments: number = 0;
  @Input() likes: number = 0;
  @Input() isFirstBlock: boolean = false;
  userInfo: string[] = [];
  postsInfo: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['comments'] ||
      changes['dateOfRegister'] ||
      changes['posts$'] ||
      changes['isFirstBlock'] ||
      changes['likes']
    ) {
      this.userInfo = [
        `Your profile info`,
        `Date of register: ${this.dateOfRegister || 0}`,
        `Number of uploaded post: ${this.posts$?.length || 0}`,
      ];
      this.postsInfo = [
        `Statistics for posts`,
        `Comments: ${this.comments || 0} `,
        `Likes: ${this.likes || 0}`,
      ];
    }
  }
}
