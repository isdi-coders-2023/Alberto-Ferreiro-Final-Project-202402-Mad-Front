import { Component, OnInit } from '@angular/core';
import { PolicyCardComponent } from '../policy-card/policy-card.component';
import { Policy } from '../../models/policy.model';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-policy-list',
  standalone: true,
  imports: [PolicyCardComponent],
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css'],
})
export class PolicyListComponent implements OnInit {
  policies: Policy[] = [];

  constructor(private stateService: StateService) {}

  ngOnInit() {
    const userId = this.stateService.state.currentPayload?.id;
    if (!userId) {
      console.error('User ID is not available');
      return;
    }
    if (userId) {
      this.stateService.getUserPolicies(userId);
      this.stateService.getState().subscribe((state) => {
        this.policies = state.policies;
      });
    }
  }
}
