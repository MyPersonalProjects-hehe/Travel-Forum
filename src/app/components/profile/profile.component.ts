import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Database, onValue, ref } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OverviewComponent } from './overview/overview.component';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [NgIf, OverviewComponent],
  providers: [MessageService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  currentSection: string = 'overview';
  userCredentials$: any;

  constructor(private db: Database, private route: ActivatedRoute) {}

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
}
