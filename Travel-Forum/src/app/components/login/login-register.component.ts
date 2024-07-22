import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css',
})
export class LoginRegisterComponent {
  email: string = '';
  password: string = '';
  @Input() heading: string = 'Login now!';
  @Input() buttonText: string = 'Login';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
