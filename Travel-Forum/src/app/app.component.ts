import { Component, Input, input } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import { PopUp } from './components/login/pop-up.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PopUp, LoginComponent, RegisterComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Travel-Forum';
  activeComponent = true;

  constructor(private router: Router) {}
  onButtonClicked(value: any) {
    console.log(value.value);
    this.activeComponent = false;
    this.router.navigate(['register']);
  }
}
