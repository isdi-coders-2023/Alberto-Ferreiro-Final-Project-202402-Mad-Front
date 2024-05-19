import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StateService } from './services/state.service';
import { HeaderComponent } from './components/header/header.component';
import LoginComponent from './components/login/login.component';
import RegisterComponent from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class AppComponent {
  constructor(private state: StateService) {
    this.state.checkPersistence();
  }
  title = 'Umbrella-Project';
}
