import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  lastRoute = '';
  constructor(private router: Router) {
    console.log(this.lastRoute, 'after refresh');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.lastRoute = event.url;
        console.log(this.lastRoute, 'before refresh');
      }
    });
  }

  getLastRoute() {
    return this.lastRoute;
  }
}
