import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PoliciesRepoService } from '../../services/policies.repo.service';
import { Policy } from '../../models/policy.model';

@Component({
  selector: 'app-edit-policy',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './edit-policy.component.html',
  styleUrls: ['./edit-policy.component.css'],
})
export default class EditPolicyComponent implements OnInit {
  editPolicyForm: FormGroup;
  policy!: Policy;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private policiesRepo: PoliciesRepoService
  ) {
    this.editPolicyForm = this.fb.group({
      policyType: ['', Validators.required],
      carMake: ['', Validators.required],
      carModel: ['', Validators.required],
      carAge: ['', Validators.required],
      plateNumber: ['', Validators.required],
    });
  }

  ngOnInit() {
    const policyId = this.route.snapshot.paramMap.get('id');
    if (policyId) {
      this.policiesRepo.getById(policyId).subscribe((policy: Policy) => {
        this.policy = policy;
        this.editPolicyForm.patchValue(policy);
      });
    }
  }

  onUpdatePolicy() {
    if (this.editPolicyForm.valid) {
      const policyData = this.editPolicyForm.value;
      this.policiesRepo.updatePolicy(this.policy.id, policyData).subscribe({
        next: (updatedPolicy) => {
          console.log('Policy updated:', updatedPolicy);
          this.router.navigate(['/view-policy', this.policy.id]);
        },
        error: (err) => {
          console.error('Error updating policy:', err);
        },
      });
    } else {
      console.log('Invalid form data');
    }
  }

  onDeletePolicy() {
    if (confirm('Are you sure you want to cancel your policy?')) {
      this.policiesRepo.deletePolicy(this.policy.id).subscribe({
        next: () => {
          console.log('Policy deleted');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error deleting policy:', err);
        },
      });
    }
  }
  keyboardDelete(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onDeletePolicy();
    }
  }
  backHome() {
    this.router.navigate(['/view-policy', this.policy.id]);
  }

  keyboardHome(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.backHome();
    }
  }
}
