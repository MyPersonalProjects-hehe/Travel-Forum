import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommentComponent } from '../../../icons/comment/comment.component';
import { ClipboardComponent } from '../../../icons/clipboard/clipboard.component';
import { CameraComponent } from '../../../icons/camera/camera.component';

@Component({
  selector: 'infoByte',
  standalone: true,
  imports: [NgIf, CommentComponent, ClipboardComponent, CameraComponent],
  templateUrl: './info.byte.component.html',
  styleUrl: './info.byte.component.scss',
})
export class InfoByteComponent {
  @Input() reverse: any;
  @Input() likeFunctionality: any;
  @Input() uploadFunctionality: any;
  @Input() commentFunctionality: any;
  @Input() creditFunctionality: any;
}
