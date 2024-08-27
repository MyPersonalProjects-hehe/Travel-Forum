import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'trending-users',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './trending.users.component.html',
  styleUrl: './trending.users.component.scss',
})
export class TrendingUsersComponent implements OnInit {
  map: Map<string, object> = new Map();
  trendingUsers: any;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    const result = await this.userService.fetchTrendingUsers();
    this.trendingUsers = Object.values(result);
    console.log(this.trendingUsers);
  }
}
