import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsersRepoService } from '../../services/users.repo.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const httpMock = {
    get: jasmine.createSpy('get').and.returnValue(of()),
  };
  const repoMock = {
    getById: jasmine
      .createSpy('getById')
      .and.returnValue(
        of({ id: '1234567890', name: 'Axl', email: 'axl@example.com' })
      ),
    register: jasmine.createSpy('register').and.returnValue(
      of({
        id: '1234567890',
        email: 'axl@rose.com',
        name: 'Axl',
        policies: [],
      })
    ),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        {
          provide: HttpClient,
          useValue: httpMock,
        },
        { provide: UsersRepoService, useValue: repoMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have form inputs valid when correct data is provided', () => {
    const userEmail = component.registerForm.controls['email'];
    const userPass = component.registerForm.controls['password'];
    const userName = component.registerForm.controls['name'];
    const userAge = component.registerForm.controls['age'];
    const userLicense = component.registerForm.controls['licenseYear'];

    userEmail.setValue('test@example.com');
    userPass.setValue('12345');
    userName.setValue('Axl');
    userAge.setValue(36);
    userLicense.setValue('2014');
    expect(component.registerForm.valid).toBeTruthy();
  });
  it('should call login service on valid form submission', () => {
    component.registerForm.controls['email'].setValue('user@example.com');
    component.registerForm.controls['password'].setValue('password');
    component.registerForm.controls['name'].setValue('Axl');
    component.registerForm.controls['age'].setValue(36);
    component.registerForm.controls['licenseYear'].setValue(2014);
    component.onRegister();
    expect(repoMock.register).toHaveBeenCalledOnceWith({
      email: 'user@example.com',
      password: 'password',
      name: 'Axl',
      age: 36,
      licenseYear: 2014,
    });
  });
});
