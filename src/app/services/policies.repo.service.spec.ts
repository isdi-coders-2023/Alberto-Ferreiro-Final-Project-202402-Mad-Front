import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { PoliciesRepoService } from './policies.repo.service';
import { Policy, CreatePolicyDto } from '../models/policy.model';
import { Claim } from '../models/claims.model';
import { environment } from '../../environments/environment';

describe('PoliciesRepoService', () => {
  let service: PoliciesRepoService;
  const mockClient = {
    get: jasmine.createSpy('get').and.returnValue(of()),
    post: jasmine.createSpy('post').and.returnValue(of()),
    patch: jasmine.createSpy('patch').and.returnValue(of()),
    delete: jasmine.createSpy('delete').and.returnValue(of()),
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
          plateNumber: '1234ABC',
          carAge: 5,
          id: 'policyId1',
          policyType: 'auto',
          userId: 'userId1',
          claims: [],
        },
        {
          policyNumber: 2,
          carMake: 'Toyota',
          carModel: 'Camry',
          plateNumber: '5678DEF',
          carAge: 3,
          id: 'policyId2',
          policyType: 'auto',
          userId: 'userId2',
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

  describe('createPolicy', () => {
    it('should send a POST request to create a new policy', () => {
      const newPolicy: CreatePolicyDto = {
        carMake: 'Ford',
        carModel: 'Mustang',
        plateNumber: 'LMN456',
        carAge: 2,
        policyType: 'auto',
        userId: 'newUserId',
      };
      const createdPolicy: Policy = {
        ...newPolicy,
        id: 'newPolicyId',
        policyNumber: 5,
        claims: [],
      };

      mockClient.post.and.returnValue(of(createdPolicy));

      service.createPolicy(newPolicy).subscribe((policy) => {
        expect(policy).toEqual(createdPolicy);
      });

      expect(mockClient.post).toHaveBeenCalledWith(
        `${service.url}/create`,
        newPolicy
      );
    });
  });

  describe('getById', () => {
    it('should fetch a policy by its ID', () => {
      const policyId = 'policyId1';
      const mockPolicy: Policy = {
        policyNumber: 3,
        carMake: 'Toyota',
        carModel: 'Camry',
        plateNumber: 'XYZ123',
        carAge: 5,
        id: policyId,
        policyType: 'auto',
        userId: 'userId1',
        claims: [],
      };

      mockClient.get.and.returnValue(of(mockPolicy));

      service.getById(policyId).subscribe((policy) => {
        expect(policy).toEqual(mockPolicy);
      });

      expect(mockClient.get).toHaveBeenCalledWith(`${service.url}/${policyId}`);
    });
  });

  describe('deletePolicy', () => {
    it('should send a DELETE request to delete a policy', () => {
      const policyId = 'policyId1';

      mockClient.delete.and.returnValue(of({}));

      service.deletePolicy(policyId).subscribe((response) => {
        expect(response).toEqual({});
      });

      expect(mockClient.delete).toHaveBeenCalledWith(
        `${service.url}/${policyId}`
      );
    });
  });

  describe('getClaimsByPolicyId', () => {
    it('should fetch claims by policy ID and return an array of claims', () => {
      const policyId = 'policyId1';
      const mockClaims: Claim[] = [
        {
          id: 'claimId1',
          policyId: policyId,
          type: 'accident',
          phoneNumber: '1234567890',
          address: '123 Main St',
          status: 'open',
          imageUrl: 'http://example.com/image.jpg',
          claimNumber: 1,
        },
        {
          id: 'claimId2',
          policyId: policyId,
          type: 'theft',
          phoneNumber: '0987654321',
          address: '456 Elm St',
          status: 'closed',
          imageUrl: 'http://example.com/image2.jpg',
          claimNumber: 2,
        },
      ];

      mockClient.get.and.returnValue(of(mockClaims));

      service.getClaimsByPolicyId(policyId).subscribe((claims) => {
        expect(claims).toEqual(mockClaims);
        expect(claims instanceof Array).toBeTrue();
        expect(claims[0].id).toBeDefined();
        expect(claims[0].policyId).toBe(policyId);
      });

      expect(mockClient.get).toHaveBeenCalledWith(
        `${environment.apiUrl}/claims/policy/${policyId}`
      );
    });
  });

  describe('createClaim', () => {
    it('should send a POST request to create a new claim', () => {
      const newClaim: Claim = {
        id: 'claimId3',
        policyId: 'policyId1',
        type: 'accident',
        phoneNumber: '1122334455',
        address: '789 Pine St',
        status: 'open',
        imageUrl: 'http://example.com/image3.jpg',
        claimNumber: 3,
      };

      mockClient.post.and.returnValue(of(newClaim));

      service.createClaim(newClaim).subscribe((claim) => {
        expect(claim).toEqual(newClaim);
      });

      expect(mockClient.post).toHaveBeenCalledWith(
        `${environment.apiUrl}/claims`,
        newClaim
      );
    });
  });
});
