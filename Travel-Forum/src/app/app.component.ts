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
import { PostsComponent } from './components/posts/posts.component';

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
    PostsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Travel-Forum';
  activeComponent: any = 'Login';
  user: User | null = null;

  constructor(private userService: UserService, private auth: AuthService) {}

  onButtonClicked(value: any) {
    this.activeComponent = value;
    console.log(this.activeComponent);
  }

  ngOnInit() {
    this.userService.user$?.subscribe((user) => {
      this.user = user;
    });
    console.log(this.user);
  }

  async logout() {
    await this.auth.logout();
  }

  click() {
    console.log(this.user);
  }
}
