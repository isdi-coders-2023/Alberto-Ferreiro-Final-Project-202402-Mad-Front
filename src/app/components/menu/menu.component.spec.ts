import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StateService, State } from '../../services/state.service';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let router: Router;
  let stateServiceMock: Partial<StateService>;
  let stateSubject: BehaviorSubject<State>;

  beforeEach(async () => {
    stateSubject = new BehaviorSubject<State>({
      loginState: 'idle',
      token: null,
      currentPayload: null,
      currentUser: null,
      policies: [],
    });

    stateServiceMock = {
      getState: () => stateSubject.asObservable(),
      setLogout: jasmine.createSpy('setLogout'),
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MenuComponent],
      providers: [{ provide: StateService, useValue: stateServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu visibility when burger icon is clicked', () => {
    const burgerIcon = fixture.nativeElement.querySelector('.burger-icon');
    burgerIcon.click();
    fixture.detectChanges();
    expect(component.menuVisible).toBe(true);
  });

  it('should toggle menu visibility when "Enter" key is pressed on burger icon', () => {
    const burgerIcon = fixture.nativeElement.querySelector('.burger-icon');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });

    burgerIcon.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.menuVisible).toBe(true);
  });

  it('should display "Perfil" and "Salir" when user is logged in', () => {
    stateSubject.next({
      loginState: 'logged',
      token: 'mockToken',
      currentPayload: { id: 'user123' },
      currentUser: {
        id: 'user123',
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      policies: [],
    });
    fixture.detectChanges();

    component.menuVisible = true;
    fixture.detectChanges();

    const profileLink = fixture.nativeElement.querySelector(
      'a[routerLink="/home"]'
    );
    const logoutLink = fixture.nativeElement.querySelector('a[tabindex="0"]');

    expect(profileLink).toBeTruthy();
    expect(profileLink.textContent).toContain('Perfil');
    expect(logoutLink).toBeTruthy();
    expect(logoutLink.textContent).toContain('Salir');
  });

  it('should display "Entrar" and "Registrarse" when user is not logged in', () => {
    stateSubject.next({
      loginState: 'idle',
      token: null,
      currentPayload: null,
      currentUser: null,
      policies: [],
    });
    fixture.detectChanges();

    component.menuVisible = true;
    fixture.detectChanges();

    const loginLink = fixture.nativeElement.querySelector(
      'a[routerLink="/user-login"]'
    );
    const registerLink = fixture.nativeElement.querySelector(
      'a[routerLink="/user-register"]'
    );

    expect(loginLink).toBeTruthy();
    expect(loginLink.textContent).toContain('Entrar');
    expect(registerLink).toBeTruthy();
    expect(registerLink.textContent).toContain('Registrarse');
  });

  it('should logout and navigate to /logout when logout is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.logout();
    fixture.detectChanges();

    expect(stateServiceMock.setLogout).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/logout']);
  });

  it('should logout and navigate to /logout when "Enter" key is pressed on logout link', () => {
    stateSubject.next({
      loginState: 'logged',
      token: 'mockToken',
      currentPayload: { id: 'user123' },
      currentUser: {
        id: 'user123',
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      policies: [],
    });
    fixture.detectChanges();

    component.menuVisible = true;
    fixture.detectChanges();

    const navigateSpy = spyOn(router, 'navigate');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });

    const logoutLink = fixture.nativeElement.querySelector('a[tabindex="0"]');
    expect(logoutLink).toBeTruthy();

    logoutLink.dispatchEvent(event);
    fixture.detectChanges();

    expect(stateServiceMock.setLogout).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/logout']);
  });
});
