import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRepoService } from '../../services/users.repo.service';
import LoginComponent from './login.component';
import { StateService } from '../../services/state.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const httpClientMock = {
    get: jasmine.createSpy('get').and.returnValue(of()),
  };
  const stateServiceMock = {
    setLogin: jasmine
      .createSpy('setLogin')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .and.callFake(function (token: string) {
        stateServiceMock.state.loginState = 'logged';
      }),
    setLoginState: jasmine
      .createSpy('setLoginState')
      .and.callFake(function (state: string) {
        stateServiceMock.state.loginState = state;
      }),
    state: {
      loginState: 'idle',
    },
    getState: () =>
      of({
        loginState: stateServiceMock.state.loginState,
        token: null,
        currentPayload: null,
        currentUser: null,
        policies: [],
      }),
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
        { provide: StateService, useValue: stateServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    repoServiceMock.login.calls.reset();
    stateServiceMock.setLogin.calls.reset();
    stateServiceMock.setLoginState.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form inputs valid when correct data is provided', () => {
    const emailInput = component.loginForm.controls['email'];
    const passwordInput = component.loginForm.controls['password'];

    emailInput.setValue('test@example.com');
    passwordInput.setValue('12345');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should call login service on valid form submission', () => {
    component.loginForm.controls['email'].setValue('user@example.com');
    component.loginForm.controls['password'].setValue('password');
    component.onLogin();
    expect(repoServiceMock.login).toHaveBeenCalledOnceWith({
      email: 'user@example.com',
      password: 'password',
    });
  });

  it('should handle login errors', fakeAsync(() => {
    repoServiceMock.login.and.returnValue(
      throwError({ error: 'Invalid credentials' })
    );

    component.loginForm.controls['email'].setValue('user@example.com');
    component.loginForm.controls['password'].setValue('wrongpassword');
    component.onLogin();

    tick();

    expect(stateServiceMock.setLoginState).toHaveBeenCalledWith('error');
    expect(stateServiceMock.state.loginState).toEqual('error');
  }));
});
