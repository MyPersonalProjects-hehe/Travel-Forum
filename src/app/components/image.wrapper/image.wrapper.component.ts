import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'image-wrapper',
  standalone: true,
  imports: [NgIf],
  templateUrl: './image.wrapper.component.html',
  styleUrl: './image.wrapper.component.scss',
})
export class ImageWrapper {
  @Input() heading: string = '';
  @Input() image: string = '';
  @Input() isNoPostsComponent: boolean = false;
}
