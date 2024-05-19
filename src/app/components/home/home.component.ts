import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { User } from '../../models/user.model';
import { PolicyListComponent } from '../policy-list/policy-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PolicyListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export default class HomeComponent implements OnInit {
  user!: User;

  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit() {
    this.stateService.getState().subscribe((state) => {
      this.user = state.currentUser as User;
    });
  }

  createPolicy() {
    this.router.navigate(['/create-policy']);
  }
}
