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
import { UsersRepoService } from '../../services/users.repo.service';
import EditUserComponent from './edit-user.component';
import { User } from '../../models/user.model';

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password123',
  age: 30,
  licenseYear: 2010,
  bankAccount: '123-45-6789-0123',
  policies: [],
};

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      get: (param: string) => '1',
    },
  },
};

const mockUsersRepoService = {
  getById: jasmine.createSpy('getById').and.returnValue(of(mockUser)),
  getDetailsById: jasmine
    .createSpy('getDetailsById')
    .and.returnValue(of(mockUser)),
  updateUser: jasmine.createSpy('updateUser').and.returnValue(of(mockUser)),
};

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: EditUserComponent },
        ]),
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: UsersRepoService, useValue: mockUsersRepoService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with user data', () => {
    expect(component.editUserForm.value).toEqual({
      name: mockUser.name,
      email: mockUser.email,
      age: mockUser.age,
      licenseYear: mockUser.licenseYear,
      password: mockUser.password,
      bankAccount: mockUser.bankAccount,
    });
  });

  it('should call updateUser method on form submission', fakeAsync(() => {
    component.editUserForm.setValue({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      age: 25,
      licenseYear: 2015,
      password: 'newpassword123',
      bankAccount: '555-34-1234-5678',
    });
    component.onUpdateUser();
    tick();
    expect(mockUsersRepoService.updateUser).toHaveBeenCalledWith('1', {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      age: 25,
      licenseYear: 2015,
      password: 'newpassword123',
      bankAccount: '555-34-1234-5678',
    });
  }));

  it('should log error on update failure', fakeAsync(() => {
    mockUsersRepoService.updateUser.and.returnValue(
      throwError(() => new Error('Update failed'))
    );
    spyOn(console, 'error');
    component.editUserForm.setValue({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      age: 25,
      licenseYear: 2015,
      password: 'newpassword123',
      bankAccount: '555-34-1234-5678',
    });
    component.onUpdateUser();
    tick();
    expect(console.error).toHaveBeenCalledWith(
      'Error updating user:',
      jasmine.any(Error)
    );
  }));

  it('should be valid for any bank account format', () => {
    component.editUserForm.setValue({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      age: 25,
      licenseYear: 2015,
      password: 'newpassword123',
      bankAccount: 'any-format',
    });
    expect(component.editUserForm.valid).toBeTrue();
  });
});
