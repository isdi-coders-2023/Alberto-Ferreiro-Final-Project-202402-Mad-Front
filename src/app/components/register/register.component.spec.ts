import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRepoService } from '../../services/users.repo.service';
import RegisterComponent from './register.component';
import { StateService } from '../../services/state.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const httpClientMock = {
    get: jasmine.createSpy('get').and.returnValue(of()),
  };
  const stateServiceMock = {
    state: { loginState: 'idle' },
    setLoginState: jasmine.createSpy('setLoginState'),
  };
  const repoMock = {
    register: jasmine
      .createSpy('register')
      .and.returnValue(throwError({ error: 'Registration failed' })),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule],
      providers: [
        { provide: HttpClient, useValue: httpClientMock },
        { provide: UsersRepoService, useValue: repoMock },
        { provide: StateService, useValue: stateServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    repoMock.register.calls.reset();
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

  it('should call register service on valid form submission', () => {
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

  it('should handle registration error and set registryError to true', fakeAsync(() => {
    repoMock.register.and.returnValue(
      throwError({ error: 'Registration failed' })
    );

    component.registerForm.controls['email'].setValue('user@example.com');
    component.registerForm.controls['password'].setValue('password');
    component.registerForm.controls['name'].setValue('Axl');
    component.registerForm.controls['age'].setValue(36);
    component.registerForm.controls['licenseYear'].setValue(2014);
    component.onRegister();

    tick();

    expect(repoMock.register).toHaveBeenCalledTimes(1);
    expect(component.registryError).toBeTrue();
  }));
});
