import { Component, Input } from '@angular/core';
import { Policy } from '../../models/policy.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-policy-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './policy-card.component.html',
  styleUrls: ['./policy-card.component.css'],
})
export class PolicyCardComponent {
  @Input() policy!: Policy;

  constructor(private router: Router) {}

  viewPolicy() {
    this.router.navigate(['/view-policy', this.policy.id]);
  }
  getPriceClass(type: string): string {
    switch (type) {
      case 'auto':
        return 'auto';
      case 'moto':
        return 'moto';
      default:
        return 'auto';
    }
  }
}
