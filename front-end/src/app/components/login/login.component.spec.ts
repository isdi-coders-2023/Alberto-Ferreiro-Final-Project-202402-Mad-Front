import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRepoService } from '../../services/users.repo.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const httpClientMock = {
    get: jasmine.createSpy('get').and.returnValue(of()),
  };
  const repoServiceMock = {
    login: jasmine.createSpy('login').and.returnValue(
      of({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkF4bCIsImlhdCI6MTUxNjIzOTAyMn0.s5D5Gyef2H2fQhHaq3h1QC6C7fwD4Ox4f6WR_r5xrh8',
      })
    ),
    getById: jasmine
      .createSpy('getById')
      .and.returnValue(
        of({ id: '1234567890', name: 'Axl', email: 'axl@example.com' })
      ),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, FormsModule],
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientMock,
        },
        { provide: UsersRepoService, useValue: repoServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    repoServiceMock.login.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have form inputs valid when correct data is provided', () => {
    const emailInput = component.loginForm.controls['email'];
    const passwordInput = component.loginForm.controls['password'];
    const confirmPasswordInput =
      component.loginForm.controls['confirmPassword'];

    emailInput.setValue('test@example.com');
    passwordInput.setValue('12345');
    confirmPasswordInput.setValue('12345');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should not login when passwords do not match', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('12345');
    component.loginForm.controls['confirmPassword'].setValue('123456');
    fixture.detectChanges();
    component.onLogin();
    expect(component.passCheck).toBeFalsy();
    expect(repoServiceMock.login.calls.any()).toBeFalse();
  });
  it('should call login service on valid form submission', () => {
    component.loginForm.controls['email'].setValue('user@example.com');
    component.loginForm.controls['password'].setValue('password');
    component.loginForm.controls['confirmPassword'].setValue('password');
    component.onLogin();
    expect(component.passCheck).toBeTruthy();
    expect(repoServiceMock.login).toHaveBeenCalledOnceWith({
      email: 'user@example.com',
      password: 'password',
    });
  });
  it('should set login state on successful login', fakeAsync(() => {
    component.loginForm.controls['email'].setValue('user@example.com');
    component.loginForm.controls['password'].setValue('password');
    component.loginForm.controls['confirmPassword'].setValue('password');
    component.onLogin();

    tick();

    expect(component.getLoginState()).toEqual('logged');
  }));
  it('should display an error message when passwords do not match', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('12345');
    component.loginForm.controls['confirmPassword'].setValue('123456');
    fixture.detectChanges();

    component.onLogin();
    fixture.detectChanges();

    const errorMsg = fixture.nativeElement.querySelector('.wrong-pass');
    expect(errorMsg).toBeTruthy();
    expect(errorMsg.innerText).toContain('Las contraseñas deben coincidir');
  });
});
