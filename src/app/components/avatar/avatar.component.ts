import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { OnInit } from '@angular/core';
import { onValue, ref } from 'firebase/database';
import { Database } from '@angular/fire/database';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'avatar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent implements OnInit {
  userSubject: any = null;
  userCredentials$: any = null;

  constructor(
    private auth: AuthService,
    private db: Database,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => (this.userSubject = user));
    const userRef = ref(this.db, `users`);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const filteredUsers = Object.values(data).filter(
          (obj: any) => obj.email === this.userSubject.email
        );
        this.userCredentials$ = filteredUsers[0];
      }
    });
  }

  toggleProfileView() {
    this.router.navigate([`/profile/${this.userCredentials$.username}`]);
  }

  async logout() {
    await this.auth.logout();
  }
}
