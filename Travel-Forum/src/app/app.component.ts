import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PopUp } from './components/login/pop-up.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgIf } from '@angular/common';
import { HomeComponent } from './components/home/home.component';

import { User } from 'firebase/auth';
import { AuthService } from './services/auth.service';

import { NavbarComponent } from './components/navbar/navbar.component';

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

    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Travel-Forum';
  activeComponent: any = 'Login';
  user: User | null = null;

  constructor(private auth: AuthService) {}

  onButtonClicked(value: any) {
    this.activeComponent = value;
    console.log(this.activeComponent);
  }

  ngOnInit() {
    this.auth.user$?.subscribe((user) => {
      this.user = user;
    });
    console.log(this.user);
  }

  click() {
    console.log(this.auth.isLoggedIn(), 'hereS');
  }
}
