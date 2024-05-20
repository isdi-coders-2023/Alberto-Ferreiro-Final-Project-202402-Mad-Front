import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import CreateClaimComponent from './create-claim.component';
import { ClaimsRepoService } from '../../services/claims.repo.service';
import { By } from '@angular/platform-browser';

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      get: (key: string) => 'policy123',
    },
  },
};

const mockClaimsRepoService = {
  createClaim: jasmine
    .createSpy('createClaim')
    .and.returnValue(of({ id: 'claim123' })),
};

describe('CreateClaimComponent', () => {
  let component: CreateClaimComponent;
  let fixture: ComponentFixture<CreateClaimComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        CreateClaimComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ClaimsRepoService, useValue: mockClaimsRepoService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateClaimComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.createClaimForm.value).toEqual({
      phoneNumber: '',
      address: '',
      image: null,
    });
  });

  it('should mark form as invalid if required fields are missing', () => {
    component.createClaimForm.setValue({
      phoneNumber: '',
      address: '',
      image: null,
    });
    expect(component.createClaimForm.valid).toBeFalse();
  });

  it('should mark form as valid if required fields are present', () => {
    component.createClaimForm.setValue({
      phoneNumber: '123456789',
      address: '123 Main St',
      image: new File([''], 'image.jpg', { type: 'image/jpeg' }),
    });
    expect(component.createClaimForm.valid).toBeTrue();
  });

  it('should call createClaim on form submission', fakeAsync(() => {
    component.createClaimForm.setValue({
      phoneNumber: '123456789',
      address: '123 Main St',
      image: new File([''], 'image.jpg', { type: 'image/jpeg' }),
    });

    component.onCreateClaim();
    tick();

    expect(mockClaimsRepoService.createClaim).toHaveBeenCalledWith(
      'policy123',
      jasmine.any(FormData)
    );
  }));

  it('should log error on claim creation failure', fakeAsync(() => {
    mockClaimsRepoService.createClaim.and.returnValue(
      throwError(() => new Error('Error creating claim'))
    );
    spyOn(console, 'error');

    component.createClaimForm.setValue({
      phoneNumber: '123456789',
      address: '123 Main St',
      image: new File([''], 'image.jpg', { type: 'image/jpeg' }),
    });

    component.onCreateClaim();
    tick();

    expect(console.error).toHaveBeenCalledWith(
      'Error creating claim:',
      jasmine.any(Error)
    );
  }));

  it('should update form control on file input change', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const input = fixture.debugElement.query(
      By.css('input[type="file"]')
    ).nativeElement;
    const file = new File([''], 'image.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileChange(event);

    expect(component.createClaimForm.get('image')?.value).toEqual(file);
  });

  it('should navigate back to the policy view on clicking "Volver a la Póliza"', fakeAsync(() => {
    const link = fixture.debugElement.query(By.css('a')).nativeElement;
    link.click();
    tick();

    expect(router.navigate).toHaveBeenCalledWith(['/view-policy', 'policy123']);
  }));
});
