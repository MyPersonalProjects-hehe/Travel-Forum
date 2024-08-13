import { Component } from '@angular/core';
import { InfoByteComponent } from './info.byte/info.byte.component';

@Component({
  selector: 'about',
  standalone: true,
  imports: [InfoByteComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
