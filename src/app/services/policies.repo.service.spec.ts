import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { PoliciesRepoService } from './policies.repo.service';
import { Policy } from '../models/policy.model';

describe('PoliciesRepoService', () => {
  let service: PoliciesRepoService;
  const mockClient = {
    get: jasmine.createSpy('get').and.returnValue(of()),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PoliciesRepoService,
        {
          provide: HttpClient,
          useValue: mockClient,
        },
      ],
    });
    service = TestBed.inject(PoliciesRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPolicies', () => {
    it('should fetch policies and return an array of policies', () => {
      const mockPolicies: Policy[] = [
        {
          policyNumber: 1,
          carMake: 'Seat',
          carModel: 'Leon',
          plateNumber: '',
          carAge: 0,
          id: 'qwerty',
          policyType: 'auto',
          userId: 'asdf',
          claims: [],
        },
        {
          policyNumber: 2,
          carMake: 'Fanta',
          carModel: 'Limón',
          plateNumber: '',
          carAge: 0,
          id: 'qwerty',
          policyType: 'auto',
          userId: 'asdf',
          claims: [],
        },
      ];

      mockClient.get.and.returnValue(of(mockPolicies));

      service.getPolicies().subscribe((policies) => {
        expect(policies).toEqual(mockPolicies);
        expect(policies instanceof Array).toBeTrue();
        expect(policies[0].policyNumber).toBeDefined();
      });

      expect(mockClient.get).toHaveBeenCalledWith(service.url);
    });
  });

  describe('getUserPolicies', () => {
    it('should fetch user policies and return an array of policies', () => {
      const userId = 'testUserId';
      const mockUserPolicies: Policy[] = [
        {
          policyNumber: 3,
          carMake: 'Toyota',
          carModel: 'Camry',
          plateNumber: 'XYZ123',
          carAge: 5,
          id: 'policyId1',
          policyType: 'auto',
          userId: userId,
          claims: [],
        },
        {
          policyNumber: 4,
          carMake: 'Honda',
          carModel: 'Civic',
          plateNumber: 'ABC456',
          carAge: 3,
          id: 'policyId2',
          policyType: 'auto',
          userId: userId,
          claims: [],
        },
      ];

      mockClient.get.and.returnValue(of(mockUserPolicies));

      service.getUserPolicies(userId).subscribe((policies) => {
        expect(policies).toEqual(mockUserPolicies);
        expect(policies instanceof Array).toBeTrue();
        expect(policies[0].policyNumber).toBeDefined();
        expect(policies[0].userId).toBe(userId);
      });

      expect(mockClient.get).toHaveBeenCalledWith(
        `${service.url}/user/${userId}`
      );
    });
  });
});
