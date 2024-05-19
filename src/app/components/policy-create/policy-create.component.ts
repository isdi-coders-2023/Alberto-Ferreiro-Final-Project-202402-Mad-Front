import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PoliciesRepoService } from '../../services/policies.repo.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CreatePolicyDto } from '../../models/policy.model';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-policy-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './policy-create.component.html',
  styleUrl: './policy-create.component.css',
})
export default class PolicyCreateComponent implements OnInit {
  policyForm: FormGroup;
  policyName: string = '';
  bottomPrice: number = 0;
  price: number | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private policyRepo: PoliciesRepoService,
    private router: Router,
    private state: StateService,
    private route: ActivatedRoute
  ) {
    this.policyForm = this.fb.group({
      policyName: [{ value: '', disabled: true }],
      policyType: ['', Validators.required],
      carMake: ['', Validators.required],
      carModel: ['', Validators.required],
      carAge: ['', Validators.required],
      plateNumber: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.policyName = params.get('policyName') || '';
      this.policyForm.patchValue({ policyName: this.policyName });

      if (this.policyName === 'Terceros Ampliado') {
        this.policyForm.patchValue({ policyType: 'auto' });
        this.bottomPrice = 199;
      } else if (this.policyName === 'Todo Riesgo') {
        this.policyForm.patchValue({ policyType: 'auto' });
        this.bottomPrice = 350;
      } else if (this.policyName === 'Ampliada Moto') {
        this.policyForm.patchValue({ policyType: 'moto' });
        this.bottomPrice = 150;
      } else {
        this.policyForm.patchValue({ policyType: 'moto' });
        this.bottomPrice = 90;
      }
    });
    this.state.getState().subscribe((state) => {
      this.isLoggedIn = state.loginState === 'logged';
    });
  }

  onCalculatePrice() {
    if (this.policyForm.valid) {
      const formData = this.policyForm.getRawValue();
      const extra = this.bottomPrice * 0.05 * formData.carAge;
      this.price = this.bottomPrice + extra;
    } else {
      console.log('Invalid form data');
    }
  }

  onCreatePolicy() {
    if (this.policyForm.valid) {
      const data = this.policyForm.value;
      const userId = this.state.state.currentPayload!.id;
      const policyData: CreatePolicyDto = {
        policyType: data.policyType,
        carMake: data.carMake,
        carModel: data.carModel,
        carAge: data.carAge,
        plateNumber: data.plateNumber,
        userId: userId,
      };

      this.policyRepo.createPolicy(policyData).subscribe({
        next: (policy) => {
          console.log('Policy created:', policy);
          this.router.navigate(['/landing']);
        },
        error: (err) => {
          console.error('Error creating policy:', err);
        },
      });
    } else {
      console.log('Invalid form data');
    }
  }
}
