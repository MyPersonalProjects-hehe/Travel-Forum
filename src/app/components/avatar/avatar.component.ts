import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { OnInit } from '@angular/core';
import { onValue, ref } from 'firebase/database';
import { Database } from '@angular/fire/database';

@Component({
  selector: 'avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent implements OnInit {
  currentUser: any = null;
  currentUserInfo$: any = null;

  constructor(private auth: AuthService, private db: Database) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => (this.currentUser = user));
    const userRef = ref(this.db, `users`);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const filteredUsers = Object.values(data).filter(
          (obj: any) => obj.email === this.currentUser.email
        );
        this.currentUserInfo$ = filteredUsers[0];
      }
    });
  }
}
