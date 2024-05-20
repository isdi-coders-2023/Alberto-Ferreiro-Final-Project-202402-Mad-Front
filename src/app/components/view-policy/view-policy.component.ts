import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliciesRepoService } from '../../services/policies.repo.service';
import { Policy } from '../../models/policy.model';

@Component({
  selector: 'app-view-policy',
  standalone: true,
  imports: [],
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.css'],
})
export default class ViewPolicyComponent implements OnInit {
  policy!: Policy;

  constructor(
    private route: ActivatedRoute,
    private policiesRepo: PoliciesRepoService,
    private router: Router
  ) {}

  ngOnInit() {
    const policyId = this.route.snapshot.paramMap.get('id');
    if (policyId) {
      this.policiesRepo.getById(policyId).subscribe((policy: Policy) => {
        this.policy = policy;
      });
    }
  }
  editPolicy() {
    this.router.navigate(['/edit-policy', this.policy.id]);
  }
  backHome() {
    this.router.navigate(['/home']);
  }
  keyboardHome(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.backHome();
    }
  }

  viewClaims() {
    this.router.navigate(['/claims', this.policy.id]);
  }
  keyboardViewClaims(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.viewClaims();
    }
  }

  createClaim(type: string) {
    this.router.navigate(['/create-claim', this.policy.id, type]);
  }

  newClaim(type: string) {
    this.router.navigate(['/create-claim', this.policy.id, type]);
  }

  keyboardNewClaimCrash(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const type = 'crash';
      this.router.navigate(['/create-claim', this.policy.id, type]);
    }
  }
  keyboardNewClaimRoad(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const type = 'road';
      this.router.navigate(['/create-claim', this.policy.id, type]);
    }
  }
}
