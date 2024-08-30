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
  @Input() likeFunctionality: boolean = false;
  @Input() uploadFunctionality: boolean = false;
  @Input() commentFunctionality: boolean = false;
  @Input() creditFunctionality: boolean = false;
}
