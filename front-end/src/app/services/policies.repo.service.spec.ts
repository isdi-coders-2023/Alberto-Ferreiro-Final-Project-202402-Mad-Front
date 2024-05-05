import { TestBed } from '@angular/core/testing';

import { PoliciesRepoService } from './policies.repo.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
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
          policyNumber: '1',
          carMake: 'Seat',
          carModel: 'Leon',
          plateNumber: '',
          carAge: 0,
        },
        {
          policyNumber: '2',
          carMake: 'Fanta',
          carModel: 'Limón',
          plateNumber: '',
          carAge: 0,
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
});
