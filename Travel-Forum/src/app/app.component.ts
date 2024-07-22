import { Component, Input, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopUp } from './components/login/pop-up.component';
import { LoginRegisterComponent } from './components/login/login-register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PopUp, LoginRegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Travel-Forum';
}
