import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, LoginComponent],
})
export class AppComponent {
  constructor(private state: StateService) {
    this.state.checkPersistence();
  }
  title = 'Umbrella-Project';
}
