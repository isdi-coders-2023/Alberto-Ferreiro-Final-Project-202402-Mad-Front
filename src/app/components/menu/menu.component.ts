import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  menuVisible: boolean = false;
  isLoggedIn: boolean = false;
  constructor(private state: StateService, private router: Router) {
    this.state.getState().subscribe((state) => {
      this.isLoggedIn = state.loginState === 'logged';
    });
  }
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.toggleMenu();
    }
  }
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  logout() {
    this.toggleMenu();
    this.state.setLogout();
    this.router.navigate(['/logout']);
  }
  keyboardLogout(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.logout();
    }
  }
}
