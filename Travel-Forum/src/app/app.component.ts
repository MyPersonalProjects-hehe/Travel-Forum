import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopUp } from './components/login/pop-up.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PopUp],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Travel-Forum';
}
