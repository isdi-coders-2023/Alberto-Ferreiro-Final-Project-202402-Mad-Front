import { TestBed } from '@angular/core/testing';

import { StateService } from './state.service';
import { of, throwError } from 'rxjs';
import { UsersRepoService } from './users.repo.service';
import { PoliciesRepoService } from './policies.repo.service';

describe('StateService', () => {
  let service: StateService;

  const fakeUsers = {
    login: jasmine
      .createSpy('login')
      .and.returnValue(of({ token: 'fake-token' })),
    register: jasmine
      .createSpy('register')
      .and.returnValue(throwError(() => new Error('Registration failed'))),
    getById: jasmine.createSpy('getById').and.callFake((id) => {
      return of({ id, name: 'Axl', age: 36 });
    }),
  };
  const fakePolicies = {
    getPolicies: jasmine.createSpy('getPolicies').and.returnValue(
      of([
        {
          policyNumber: '01',
          carMake: 'Ford',
          carModel: 'Siesta',
          plateNumber: 'XYZ123',
          carAge: 5,
        },
      ])
    ),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StateService,
        {
          provide: UsersRepoService,
          useValue: fakeUsers,
        },
        {
          provide: PoliciesRepoService,
          useValue: fakePolicies,
        },
      ],
    });
    service = TestBed.inject(StateService);
    const dummyToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkF4bCIsImlhdCI6MTUxNjIzOTAyMn0.s5D5Gyef2H2fQhHaq3h1QC6C7fwD4Ox4f6WR_r5xrh8';
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify({ token: dummyToken })
    );

    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'removeItem');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should check for token in localStorage and set login if token exists', () => {
    service.checkPersistence();
    expect(localStorage.getItem).toHaveBeenCalledWith('Umbrella');
  });
  it('should clear the session on logout', (done) => {
    service.setLogout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('Umbrella');
    service.getState().subscribe((state) => {
      expect(state.currentUser).toBeNull();
      expect(state.token).toBeNull();
      expect(state.loginState).toBe('idle');
      done();
    });
  });
  it('should fetch policies and update state', (done) => {
    service.getPolicies();
    expect(fakePolicies.getPolicies).toHaveBeenCalled();
    service.getState().subscribe((state) => {
      expect(state.policies).toEqual([
        {
          policyNumber: '01',
          carMake: 'Ford',
          carModel: 'Siesta',
          plateNumber: 'XYZ123',
          carAge: 5,
        },
      ]);
      done();
    });
  });
});
