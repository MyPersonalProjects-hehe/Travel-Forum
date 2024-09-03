import { Component } from '@angular/core';
import { ImageWrapper } from '../../../image.wrapper/image.wrapper.component';

@Component({
  selector: 'no-posts',
  standalone: true,
  imports: [ImageWrapper],
  templateUrl: './no.posts.component.html',
  styleUrl: './no.posts.component.scss',
})
export class NoPostsComponent {}
