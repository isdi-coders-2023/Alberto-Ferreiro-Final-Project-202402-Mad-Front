import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ClaimsRepoService } from './claims.repo.service';
import { environment } from '../../environments/environment';
import { Claim } from '../models/claims.model';

describe('ClaimsRepoService', () => {
  let service: ClaimsRepoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimsRepoService],
    });
    service = TestBed.inject(ClaimsRepoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch claims by policy ID', () => {
    const mockClaims: Claim[] = [
      {
        id: '1',
        policyId: 'policy123',
        type: 'theft',
        phoneNumber: '123456789',
        address: '123 Street',
        status: 'open',
        imageUrl: 'http://example.com/image.jpg',
        claimNumber: 1,
      },
      {
        id: '2',
        policyId: 'policy123',
        type: 'accident',
        phoneNumber: '987654321',
        address: '456 Avenue',
        status: 'closed',
        imageUrl: 'http://example.com/image2.jpg',
        claimNumber: 2,
      },
    ];

    service.getClaimsByPolicyId('policy123').subscribe((claims) => {
      expect(claims.length).toBe(2);
      expect(claims).toEqual(mockClaims);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/claims/policy/policy123`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockClaims);
  });

  it('should create a new claim', () => {
    const newClaim = new FormData();
    newClaim.append('type', 'accident');
    newClaim.append('phoneNumber', '123456789');
    newClaim.append('address', '123 Street');
    newClaim.append('image', new Blob(), 'image.jpg');

    const mockCreatedClaim: Claim = {
      id: '1',
      policyId: 'policy123',
      type: 'accident',
      phoneNumber: '123456789',
      address: '123 Street',
      status: 'open',
      imageUrl: 'http://example.com/image.jpg',
      claimNumber: 1,
    };

    service.createClaim('policy123', newClaim).subscribe((claim) => {
      expect(claim).toEqual(mockCreatedClaim);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/claims/policy/policy123`
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockCreatedClaim);
  });

  it('should handle error on creating a claim', () => {
    const newClaim = new FormData();
    newClaim.append('type', 'accident');
    newClaim.append('phoneNumber', '123456789');
    newClaim.append('address', '123 Street');
    newClaim.append('image', new Blob(), 'image.jpg');

    service.createClaim('policy123', newClaim).subscribe({
      next: () => fail('should have failed with 500 error'),
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/claims/policy/policy123`
    );
    expect(req.request.method).toBe('POST');
    req.flush('Something went wrong', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
