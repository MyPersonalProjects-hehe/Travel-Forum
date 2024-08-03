import { Component, Input } from '@angular/core';

@Component({
  selector: 'block',
  standalone: true,
  imports: [],
  templateUrl: './block.component.html',
  styleUrl: './block.component.css',
})
export class BlockComponent {
  @Input() info: any = null;
}
