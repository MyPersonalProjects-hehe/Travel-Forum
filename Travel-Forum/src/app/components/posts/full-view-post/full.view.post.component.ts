import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'fullViewPost',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './full.view.post.component.html',
  styleUrl: './full.view.post.component.css',
})
export class FullViewPostComponent implements OnInit {
  currentUser: any;
  post$: any;
  postId: any;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.auth.user$.subscribe((user) => (this.currentUser = user));
    this.postId = this.route.snapshot.paramMap.get('id');
    this.post$ = await this.userService.fetchPost(this.postId);
  }
}
