import { Component, Input } from '@angular/core';
import { CalendarComponent } from '../../icons/calendar/calendar.component';
import { NgIf } from '@angular/common';
import { UserComponent } from '../../icons/user/user.component';
import { HeartComponent } from '../../icons/heart/heart.component';
import { UploadsComponent } from '../../icons/uploads/uploads.component';

@Component({
  selector: 'block',
  standalone: true,
  imports: [
    CalendarComponent,
    NgIf,
    UserComponent,
    HeartComponent,
    UploadsComponent,
  ],
  templateUrl: './block.component.html',
  styleUrl: './block.component.css',
})
export class BlockComponent {
  @Input() info: any = null;
}
