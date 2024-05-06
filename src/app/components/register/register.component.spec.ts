import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
// import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  // const httpClientMock = {
  //   get: jasmine.createSpy('get').and.returnValue(of()),
  // };
  // const repoServiceMock = {
  //   getById: jasmine
  //     .createSpy('getById')
  //     .and.returnValue(
  //       of({ id: '1234567890', name: 'Axl', email: 'axl@example.com' })
  //     ),
  //   create: jasmine.createSpy('create').and.returnValue(of()),
  // };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
