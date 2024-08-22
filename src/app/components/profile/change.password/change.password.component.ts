import { Component } from '@angular/core';
import { validateResetPassword } from '../../../services/validations';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import {
  changePasswordError,
  changePasswordSuccess,
} from '../../../services/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'change-password',
  standalone: true,
  imports: [FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './change.password.component.html',
  styleUrl: './change.password.component.scss',
})
export class ChangePasswordComponent {
  inputEmail: string = '';
  newPassword: string = '';

  constructor(
    private auth: Auth,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  async changeCurrentPassword() {
    try {
      validateResetPassword(this.newPassword);
      await sendPasswordResetEmail(this.auth, this.inputEmail);
      this.messageService.add(changePasswordSuccess);
      setTimeout(async () => {
        await this.authService.logout();
      }, 3000);
    } catch (error) {
      this.messageService.add(changePasswordError(error));
    }
  }
}
