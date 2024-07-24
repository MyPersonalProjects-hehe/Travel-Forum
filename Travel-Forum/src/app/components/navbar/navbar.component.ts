import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => (this.user = user));
  }
}
