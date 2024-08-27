import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'block',
  standalone: true,
  imports: [NgIf],
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss',
})
export class BlockComponent {
  @Input() info: any = null;
}
