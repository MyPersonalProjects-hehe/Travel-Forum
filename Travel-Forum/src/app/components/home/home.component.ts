import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { NgFor, NgIf } from '@angular/common';
import { onValue, ref } from 'firebase/database';
import { Database } from '@angular/fire/database';

@Component({
  selector: 'home',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  currentUser: any = null;
  posts$: any = null;
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private db: Database
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => (this.currentUser = user));
    const userRef = ref(this.db, `posts/${this.currentUser?.uid}`);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.posts$ = Object.entries(data).map(([id, post]) => ({
          id,
          post,
        }));
      }
    });
  }
}
