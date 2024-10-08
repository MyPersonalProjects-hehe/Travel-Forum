import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { loginError, loginSuccess } from '../../services/toast';

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
  showPassword: boolean = false;
  @Output() buttonValue = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.messageService.add(loginSuccess);

      this.email = '';
      this.password = '';
    } catch (error) {
      this.messageService.add(loginError(error));
    }
  }

  takeButtonValue(value: string) {
    this.buttonValue.emit(value);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
