import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

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

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  async register() {
    const user = await this.auth.register(this.email, this.password);
    await this.auth.createUser(this.username);

    this.email = '';
    this.password = '';
    this.username = '';
  }
}
