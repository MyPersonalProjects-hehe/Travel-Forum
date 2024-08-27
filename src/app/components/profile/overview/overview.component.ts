import { Component, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import {
  changeAvatarError,
  changeAvatarSuccess,
} from '../../../services/toast';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'overview',
  standalone: true,
  imports: [FormsModule, NgIf, ToastModule],
  providers: [MessageService],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  showInput: boolean = false;
  image: string = '';
  currentSection: string = 'overview';
  @Input() userCredentials: any;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  async changeAvatar() {
    try {
      await this.userService.changeUserAvatar(
        this.userCredentials.username,
        this.image
      );
      this.messageService.add(changeAvatarSuccess);
      this.image = '';
      this.showInput = false;
    } catch (error) {
      this.messageService.add(changeAvatarError(error));
    }
  }
}
