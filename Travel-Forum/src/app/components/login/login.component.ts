import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  @Output() buttonValue = new EventEmitter<String>();

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  async login() {
    const user = await this.authService.login(this.email, this.password);
    console.log(user);

    this.userService.setUser(user);

    this.email = '';
    this.password = '';
  }

  takeButtonValue(value: string) {
    this.buttonValue.emit(value);
    console.log(this.buttonValue);
  }
}
