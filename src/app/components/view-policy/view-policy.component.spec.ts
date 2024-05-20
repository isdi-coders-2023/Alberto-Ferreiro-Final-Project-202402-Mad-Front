import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PoliciesRepoService } from '../../services/policies.repo.service';
import ViewPolicyComponent from './view-policy.component';
import { Policy } from '../../models/policy.model';

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      get: (key: string) => '123',
    },
  },
};

const mockPolicy: Policy = {
  policyNumber: 1,
  policyType: 'auto',
  carMake: 'Toyota',
  carModel: 'Corolla',
  carAge: 5,
  plateNumber: 'XYZ123',
  id: '123',
  userId: 'user123',
  claims: [],
};

const mockPoliciesRepoService = {
  getById: jasmine.createSpy('getById').and.returnValue(of(mockPolicy)),
};

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

describe('ViewPolicyComponent', () => {
  let component: ViewPolicyComponent;
  let fixture: ComponentFixture<ViewPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPolicyComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PoliciesRepoService, useValue: mockPoliciesRepoService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display the policy details', () => {
    expect(mockPoliciesRepoService.getById).toHaveBeenCalledWith('123');
    expect(component.policy).toEqual(mockPolicy);
  });

  it('should display policy details in the template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.policy-details').textContent).toContain(
      'Toyota'
    );
    expect(compiled.querySelector('.policy-details').textContent).toContain(
      'Corolla'
    );
    expect(compiled.querySelector('.policy-details').textContent).toContain(
      '5 años'
    );
    expect(compiled.querySelector('.policy-details').textContent).toContain(
      'XYZ123'
    );
  });

  it('should navigate to edit policy page when editPolicy is called', () => {
    component.policy = mockPolicy;
    component.editPolicy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit-policy', '123']);
  });

  it('should navigate to home page when backHome is called', () => {
    component.backHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to claims page when viewClaims is called', () => {
    component.policy = mockPolicy;
    component.viewClaims();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/claims', '123']);
  });

  it('should navigate to create-claim page with type crash when createClaim is called with crash', () => {
    component.policy = mockPolicy;
    component.createClaim('crash');
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/create-claim',
      '123',
      'crash',
    ]);
  });

  it('should navigate to create-claim page with type road when createClaim is called with road', () => {
    component.policy = mockPolicy;
    component.createClaim('road');
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/create-claim',
      '123',
      'road',
    ]);
  });

  it('should navigate to create-claim page with type crash when newClaim is called with crash', () => {
    component.policy = mockPolicy;
    component.newClaim('crash');
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/create-claim',
      '123',
      'crash',
    ]);
  });

  it('should navigate to create-claim page with type road when newClaim is called with road', () => {
    component.policy = mockPolicy;
    component.newClaim('road');
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/create-claim',
      '123',
      'road',
    ]);
  });

  it('should navigate to create-claim page with type crash on Enter key press for new crash claim', () => {
    component.policy = mockPolicy;
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.keyboardNewClaimCrash(event);
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/create-claim',
      '123',
      'crash',
    ]);
  });

  it('should navigate to create-claim page with type road on Enter key press for new road claim', () => {
    component.policy = mockPolicy;
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.keyboardNewClaimRoad(event);
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/create-claim',
      '123',
      'road',
    ]);
  });

  it('should navigate to home on Enter key press for backHome', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.keyboardHome(event);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to claims page on Enter key press for viewClaims', () => {
    component.policy = mockPolicy;
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.keyboardViewClaims(event);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/claims', '123']);
  });
});
