import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NgFor, NgIf } from '@angular/common';
import { Database, ref, update } from '@angular/fire/database';

@Component({
  selector: 'trending-users',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './trending.users.component.html',
  styleUrl: './trending.users.component.scss',
})
export class TrendingUsersComponent implements OnInit {
  trendingUsers: any;

  constructor(private userService: UserService, private db: Database) {}

  async ngOnInit() {
    const result = await this.userService.fetchTrendingUsers();

    Object.values(result).map((obj: any) => {
      if (!obj) {
        this.trendingUsers = [];
      } else {
        this.trendingUsers = Object.values(result);
        const updateVal: any = {};
        updateVal['trendyUser'] = true;
        this.trendingUsers.map(
          async (obj: any) =>
            await update(ref(this.db, `users/${obj.user.username}`), updateVal)
        );
      }
    });
  }
}
