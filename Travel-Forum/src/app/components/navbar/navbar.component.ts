import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  constructor(private auth: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => (this.user = user));
  }

  async logout() {
    return await this.auth.logout();
    console.log(this.user);
  }
}
