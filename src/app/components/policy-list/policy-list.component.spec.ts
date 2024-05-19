import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolicyListComponent } from './policy-list.component';
import { BehaviorSubject } from 'rxjs';
import { StateService, State, Payload } from '../../services/state.service';
import { Policy } from '../../models/policy.model';

describe('PolicyListComponent', () => {
  let component: PolicyListComponent;
  let fixture: ComponentFixture<PolicyListComponent>;

  const mockPolicies: Policy[] = [
    {
      id: 'policy1',
      userId: 'user123',
      carMake: 'Toyota',
      carModel: 'Corolla',
      carAge: 5,
      plateNumber: 'ABC123',
      policyType: 'auto',
      policyNumber: 1,
      claims: [],
    },
  ];

  const initialMockState: State = {
    loginState: 'logged',
    token: 'mockToken',
    currentPayload: { id: 'user123' } as Payload,
    currentUser: {
      id: 'user123',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    policies: mockPolicies,
  };

  let stateServiceMock: Partial<StateService>;
  let stateSubject: BehaviorSubject<State>;

  beforeEach(async () => {
    stateSubject = new BehaviorSubject<State>({ ...initialMockState });

    stateServiceMock = {
      state: initialMockState,
      getState: () => stateSubject.asObservable(),
      getUserPolicies: jasmine
        .createSpy('getUserPolicies')
        .and.callFake((userId: string) => {
          if (userId === 'user123') {
            stateServiceMock!.state!.policies = mockPolicies;
            stateSubject.next(stateServiceMock!.state!);
          }
        }),
    };

    await TestBed.configureTestingModule({
      imports: [PolicyListComponent],
      providers: [
        {
          provide: StateService,
          useValue: stateServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display policies when user ID is available', () => {
    expect(stateServiceMock.getUserPolicies).toHaveBeenCalledWith('user123');
    expect(component.policies.length).toBe(1);
    expect(component.policies[0].carMake).toBe('Toyota');
  });
});
