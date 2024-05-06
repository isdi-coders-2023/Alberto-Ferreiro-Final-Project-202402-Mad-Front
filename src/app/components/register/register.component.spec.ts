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
    create: jasmine.createSpy('register').and.returnValue(
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
});
