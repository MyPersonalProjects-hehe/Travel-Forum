import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredential } from 'firebase/auth';

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
  username: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  async register() {
    const user = await this.auth.register(this.email, this.password);
    await this.auth.createUser(this.username);
    this.email = '';
    this.password = '';
    this.username = '';
    console.log(user);
  }

  onLoginClick() {
    this.router.navigate(['login']);
  }
}
