import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { onValue, ref } from 'firebase/database';
import { Database } from '@angular/fire/database';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'fullViewPost',
  standalone: true,
  imports: [PostComponent, NgFor, NgIf, CommonModule],
  templateUrl: './full.view.post.component.html',
  styleUrl: './full.view.post.component.scss',
})
export class FullViewPostComponent implements OnInit {
  currentUser: any;
  post$: any;
  postId: any;
  isCommentSectionOpen: boolean = false;
  comments$: any;
  userId: any;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private userService: UserService,
    private db: Database
  ) {}

  async ngOnInit() {
    this.auth.user$.subscribe((user) => (this.currentUser = user));
    this.userId = this.currentUser.uid;
    this.postId = this.route.snapshot.paramMap.get('id');
    this.post$ = await this.userService.fetchPost(this.postId);

    const postsRef = ref(this.db, `posts/${this.post$.id}/comments`);

    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.comments$ = Object.values(data);
      }
    });
  }

  toggleCommentSection() {
    this.isCommentSectionOpen = !this.isCommentSectionOpen;
  }
}
