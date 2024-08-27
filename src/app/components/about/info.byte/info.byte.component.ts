import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'infoByte',
  standalone: true,
  imports: [NgIf],
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
