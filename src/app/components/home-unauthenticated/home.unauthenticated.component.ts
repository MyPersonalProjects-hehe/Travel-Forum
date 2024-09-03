import { ImageWrapper } from './../image.wrapper/image.wrapper.component';
import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { NgIf } from '@angular/common';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'home-unauthenticated',
  standalone: true,
  imports: [
    LoginComponent,
    RegisterComponent,
    NgIf,
    CardComponent,
    ImageWrapper,
  ],
  templateUrl: './home.unauthenticated.component.html',
  styleUrl: './home.unauthenticated.component.scss',
})
export class HomeUnauthenticatedComponent {
  activeComponent: any = 'Login';
  user: User | null = null;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.user$?.subscribe((user) => {
      this.user = user;
    });
  }

  onButtonClicked(value: any) {
    this.activeComponent = value;
  }
}
