import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgIf } from '@angular/common';
import { HomeComponent } from './components/home/home.component';

import { User } from 'firebase/auth';
import { AuthService } from './services/auth.service';

import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/login/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,

    LoginComponent,
    RegisterComponent,
    NgIf,
    HomeComponent,
    CardComponent,
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
  }

  ngOnInit() {
    this.auth.user$?.subscribe((user) => {
      this.user = user;
    });
  }
}
