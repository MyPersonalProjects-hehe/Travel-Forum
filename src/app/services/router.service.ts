import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  previousRoute: any;
  currentRoute: any;

  constructor(private router: Router) {
    this.currentRoute = router.url;

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.previousRoute = this.currentRoute;
        this.currentRoute = event.url;
      });
  }
}
