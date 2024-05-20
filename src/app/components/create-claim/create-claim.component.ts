import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClaimsRepoService } from '../../services/claims.repo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-claim',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './create-claim.component.html',
  styleUrls: ['./create-claim.component.css'],
})
export default class CreateClaimComponent implements OnInit {
  createClaimForm: FormGroup;
  claimType: string;

  constructor(
    private fb: FormBuilder,
    protected route: ActivatedRoute,
    private claimsRepo: ClaimsRepoService,
    protected router: Router,
    private http: HttpClient
  ) {
    this.createClaimForm = this.fb.group({
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      image: [null, [Validators.required]],
    });
    this.claimType = '';
  }

  ngOnInit(): void {
    this.claimType = this.route.snapshot.paramMap.get('claimType') || 'crash';
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.createClaimForm.patchValue({
        image: file,
      });
    }
  }

  onCreateClaim() {
    console.log('En el componente create-claim', this.createClaimForm.value);
    if (this.createClaimForm.valid) {
      const formData = new FormData();
      formData.append(
        'phoneNumber',
        this.createClaimForm.get('phoneNumber')?.value
      );
      formData.append('address', this.createClaimForm.get('address')?.value);
      formData.append('image', this.createClaimForm.get('image')?.value);
      formData.append('type', this.claimType);

      const policyId = this.route.snapshot.paramMap.get('policyId');
      if (policyId) {
        this.claimsRepo.createClaim(policyId, formData).subscribe({
          next: (claim) => {
            console.log('Claim created:', claim);
            this.router.navigate(['/view-policy', policyId]);
          },
          error: (err) => {
            console.error('Error creating claim:', err);
          },
        });
      }
    } else {
      console.log('Invalid form data');
    }
  }

  onClick() {
    this.router.navigate([
      '/view-policy',
      this.route.snapshot.paramMap.get('policyId'),
    ]);
  }

  keyboardNavigate(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onClick();
    }
  }
}
