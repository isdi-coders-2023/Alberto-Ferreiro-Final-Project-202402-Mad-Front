import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import EditPolicyComponent from './edit-policy.component';
import { PoliciesRepoService } from '../../services/policies.repo.service';
import { Policy } from '../../models/policy.model';

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      get: (param: string) => '1',
    },
  },
};

const mockPolicy: Policy = {
  id: '1',
  policyNumber: 12345,
  policyType: 'auto',
  carMake: 'Toyota',
  carModel: 'Corolla',
  carAge: 3,
  plateNumber: 'ABC123',
  userId: 'user1',
  claims: [],
};

const mockPoliciesRepoService = {
  getById: jasmine.createSpy('getById').and.returnValue(of(mockPolicy)),
  updatePolicy: jasmine
    .createSpy('updatePolicy')
    .and.returnValue(of(mockPolicy)),
  deletePolicy: jasmine.createSpy('deletePolicy').and.returnValue(of({})),
};

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

describe('EditPolicyComponent', () => {
  let component: EditPolicyComponent;
  let fixture: ComponentFixture<EditPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PoliciesRepoService, useValue: mockPoliciesRepoService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with policy data', () => {
    expect(component.editPolicyForm.value).toEqual({
      policyType: 'auto',
      carMake: 'Toyota',
      carModel: 'Corolla',
      carAge: 3,
      plateNumber: 'ABC123',
    });
  });

  it('should update policy on valid form submission', fakeAsync(() => {
    component.editPolicyForm.patchValue({
      carMake: 'Honda',
      carModel: 'Civic',
      carAge: 5,
      plateNumber: 'XYZ789',
    });
    component.onUpdatePolicy();
    tick();
    expect(mockPoliciesRepoService.updatePolicy).toHaveBeenCalledWith('1', {
      policyType: 'auto',
      carMake: 'Honda',
      carModel: 'Civic',
      carAge: 5,
      plateNumber: 'XYZ789',
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/view-policy', '1']);
  }));

  it('should show error message on policy update failure', fakeAsync(() => {
    mockPoliciesRepoService.updatePolicy.and.returnValue(
      throwError('Error updating policy')
    );
    spyOn(console, 'error');
    component.onUpdatePolicy();
    tick();
    expect(console.error).toHaveBeenCalledWith(
      'Error updating policy:',
      'Error updating policy'
    );
  }));

  it('should navigate back to view policy on cancel', fakeAsync(() => {
    component.backHome();
    tick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/view-policy', '1']);
  }));

  it('should delete policy and navigate to home on delete confirmation', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.onDeletePolicy();
    tick();
    expect(mockPoliciesRepoService.deletePolicy).toHaveBeenCalledWith('1');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  }));
});
