import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  @Output() buttonValue = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Successfully logged in!',
        life: 3000,
      });

      this.email = '';
      this.password = '';
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Wrong email or password!',
        life: 3000,
      });
    }
  }

  takeButtonValue(value: string) {
    this.buttonValue.emit(value);
  }
}
