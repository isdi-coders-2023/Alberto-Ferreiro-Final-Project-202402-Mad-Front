import { ComponentFixture, TestBed } from '@angular/core/testing';

import ClaimListComponent from './claim-list.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ClaimsRepoService } from '../../services/claims.repo.service';
import { ActivatedRoute } from '@angular/router';

const mockClaimsRepoService = {
  getClaimsByPolicyId: jasmine.createSpy('getClaimsByPolicyId').and.returnValue(
    of([
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
    ])
  ),
};
const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      get: (key: string) => 'policy123',
    },
  },
};

describe('ClaimListComponent', () => {
  let component: ClaimListComponent;
  let fixture: ComponentFixture<ClaimListComponent>;
  const httpClientMock = {
    get: jasmine.createSpy('get').and.returnValue(of()),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimListComponent],
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientMock,
        },
        { provide: ClaimsRepoService, useValue: mockClaimsRepoService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClaimListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
