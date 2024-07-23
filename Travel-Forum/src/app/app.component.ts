import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PopUp } from './components/login/pop-up.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgIf } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { UserService } from './services/user.service';
import { User } from 'firebase/auth';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PopUp,
    LoginComponent,
    RegisterComponent,
    NgIf,
    HomeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Travel-Forum';
  activeComponent = true;
  user: User | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private auth: AuthService
  ) {}

  onButtonClicked(value: any) {
    console.log(value.value);
    this.activeComponent = false;
  }

  ngOnInit() {
    console.log(this.isLoggedIn);

    this.userService.user$.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = !!user;
    });
  }

  logout() {
    this.auth.logout();
  }
}
