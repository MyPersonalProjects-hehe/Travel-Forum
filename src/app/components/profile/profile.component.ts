import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Database, onValue, ref } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { EmailComponent } from '../../icons/email/email.component';
import { UserComponent } from '../../icons/user/user.component';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { changeAvatarError, changeAvatarSuccess } from '../../services/toast';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [NgIf, EmailComponent, UserComponent, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  currentSection: string = 'overview';
  userCredentials$: any;
  showInput: boolean = false;
  image: string = '';

  constructor(
    private db: Database,
    private route: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('id');
    const userRef = ref(this.db, `users/${username}`);

    onValue(userRef, (snapshot) => {
      this.userCredentials$ = snapshot.val();
    });
  }

  showSection(section: string) {
    this.currentSection = section;
  }

  async changeAvatar() {
    try {
      await this.userService.changeUserAvatar(
        this.userCredentials$.username,
        this.image
      );
      this.messageService.add(changeAvatarSuccess);
      this.image = '';
    } catch (error) {
      this.messageService.add(changeAvatarError(error));
    }
  }
}
