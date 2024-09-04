import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { registerError } from '../../services/toast';

@Component({
  selector: 'register',
  standalone: true,
  imports: [FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  username: string = '';
  avatar: string = '';

  constructor(
    private auth: AuthService,
    private messageService: MessageService
  ) {}

  async register() {
    try {
      await this.auth.register(this.email, this.password, this.username);
      await this.auth.createUser(this.username, this.avatar);
      this.email = '';
      this.password = '';
      this.username = '';
      this.avatar = '';
    } catch (error: any) {
      this.messageService.add(registerError(error));
    }
  }
}
