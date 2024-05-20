import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClaimsRepoService } from '../../services/claims.repo.service';
import { Claim } from '../../models/claims.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-claim-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css'],
})
export default class ClaimsListComponent implements OnInit {
  claims: Claim[] = [];

  constructor(
    private route: ActivatedRoute,
    private claimsRepo: ClaimsRepoService
  ) {}

  ngOnInit(): void {
    const policyId = this.route.snapshot.paramMap.get('policyId');
    if (policyId) {
      this.claimsRepo
        .getClaimsByPolicyId(policyId)
        .subscribe((claims: Claim[]) => {
          this.claims = claims;
        });
    }
  }
}
