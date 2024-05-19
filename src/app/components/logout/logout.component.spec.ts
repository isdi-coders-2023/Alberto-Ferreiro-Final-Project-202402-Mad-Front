import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import LogoutComponent from './logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, LogoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /landing when backToLanding is called', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.backToLanding();

    expect(navigateSpy).toHaveBeenCalledWith(['/landing']);
  });

  it('should navigate to /landing when link is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const link = fixture.nativeElement.querySelector('a');
    link.click();

    expect(navigateSpy).toHaveBeenCalledWith(['/landing']);
  });

  it('should navigate to /landing when Enter key is pressed', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const link = fixture.nativeElement.querySelector('a');
    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
    });
    link.dispatchEvent(event);

    expect(navigateSpy).toHaveBeenCalledWith(['/landing']);
  });
});
