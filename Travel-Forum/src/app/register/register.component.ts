import { Component } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  register() {
    this.auth.register(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
