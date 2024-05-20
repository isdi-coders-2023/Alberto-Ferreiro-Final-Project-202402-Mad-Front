import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import PolicyCreateComponent from './policy-create.component';
import { PoliciesRepoService } from '../../services/policies.repo.service';
import { StateService } from '../../services/state.service';

const mockActivatedRoute = {
  paramMap: of({
    get: (param: string) => {
      if (param === 'policyName') return 'Terceros Ampliado';
      return null;
    },
  }),
};

const mockState = {
  loginState: 'logged',
  token: 'mockToken',
  currentPayload: { id: 'user123' },
  currentUser: null,
  policies: [],
};

const mockStateService = {
  getState: () => of(mockState),
  state: mockState,
};

const mockPoliciesRepoService = {
  createPolicy: jasmine.createSpy('createPolicy').and.returnValue(of({})),
};

describe('PolicyCreateComponent', () => {
  let component: PolicyCreateComponent;
  let fixture: ComponentFixture<PolicyCreateComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        PolicyCreateComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: StateService, useValue: mockStateService },
        { provide: PoliciesRepoService, useValue: mockPoliciesRepoService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyCreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with policy name and type', () => {
    fixture.detectChanges();
    expect(component.policyForm.get('policyName')?.value).toBe(
      'Terceros Ampliado'
    );
    expect(component.policyForm.get('policyType')?.value).toBe('auto');
    expect(component.bottomPrice).toBe(199);
  });

  it('should calculate price correctly', () => {
    component.policyForm.patchValue({
      policyName: 'Terceros Ampliado',
      policyType: 'auto',
      carMake: 'Toyota',
      carModel: 'Corolla',
      carAge: 4,
      plateNumber: 'ABC123',
    });

    component.onCalculatePrice();

    expect(component.price).toBe(199 + 199 * 0.05 * 4);
  });

  it('should handle invalid form data in onCalculatePrice', () => {
    component.policyForm.patchValue({
      policyName: '',
      policyType: '',
      carMake: '',
      carModel: '',
      carAge: '',
      plateNumber: '',
    });

    component.onCalculatePrice();

    expect(component.price).toBeNull();
    expect(component.policyForm.valid).toBeFalse();
  });

  it('should call createPolicy method of PoliciesRepoService on form submit', fakeAsync(() => {
    component.policyForm.patchValue({
      carMake: 'Toyota',
      carModel: 'Corolla',
      carAge: 5,
      plateNumber: 'ABC123',
      policyType: 'auto',
    });
    component.onCreatePolicy();
    tick();
    expect(mockPoliciesRepoService.createPolicy).toHaveBeenCalledWith({
      policyType: 'auto',
      carMake: 'Toyota',
      carModel: 'Corolla',
      carAge: 5,
      plateNumber: 'ABC123',
      userId: 'user123',
    });
  }));

  it('should navigate to /landing after successful policy creation', fakeAsync(() => {
    component.policyForm.patchValue({
      carMake: 'Toyota',
      carModel: 'Corolla',
      carAge: 5,
      plateNumber: 'ABC123',
      policyType: 'auto',
    });
    component.onCreatePolicy();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['/landing']);
  }));
});
