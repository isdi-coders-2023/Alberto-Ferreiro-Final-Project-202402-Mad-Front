import { TestBed } from '@angular/core/testing';

import { UsersRepoService } from './users.repo.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, UserLoginDto } from '../models/user.model';

describe('RepoService', () => {
  let service: UsersRepoService;
  const httpClientMock = {
    get: jasmine.createSpy('get').and.returnValue(of()),
    post: jasmine.createSpy('post').and.returnValue(of()),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersRepoService,
        {
          provide: HttpClient,
          useValue: httpClientMock,
        },
      ],
    });
    service = TestBed.inject(UsersRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getById should return expected data on successful call', () => {
    const mockResponse: User[] = [
      {
        id: '1',
        name: 'Pepe',
        email: 'cara@papa.com',
        password: '12345',
        age: 36,
        licenseYear: 2004,
        bankAccount: '234-45',
        policies: [],
      },
    ];
    httpClientMock.get.and.returnValue(of(mockResponse));

    service.getById('1').subscribe({
      next: (data) => {
        expect(data).toEqual(mockResponse);
      },
    });

    expect(httpClientMock.get).toHaveBeenCalledWith(service.url + '/1');
  });
  it('getById should be called with the right parameters', () => {
    service.getById('1').subscribe();

    expect(httpClientMock.get).toHaveBeenCalledWith(service.url + '/1');
  });
  describe('login', () => {
    it('should send POST request with correct credentials', () => {
      const mockLoginData: UserLoginDto = {
        email: 'cara@papa',
        password: '1234',
      };
      const response = { token: 'fake-jwt-token' };

      httpClientMock.post.and.returnValue(of(response));

      service.login(mockLoginData).subscribe({
        next: (data) => {
          expect(data).toEqual(response);
        },
      });

      expect(httpClientMock.post).toHaveBeenCalledWith(
        service.url + '/login',
        mockLoginData
      );
    });
  });
  describe('register', () => {
    it('should send POST request with FormData', () => {
      const mockFormData = new FormData();
      mockFormData.append('email', 'pepe@pepito.com');
      mockFormData.append('password', 'newpassword');
      const mockRegistrar = {
        name: 'Axl',
        email: 'test@mail.com',
        age: 30,
        licenseYear: 2014,
        password: '1234',
      };

      const response = { message: 'User registered successfully' };

      httpClientMock.post.and.returnValue(of(response));

      service.register(mockRegistrar).subscribe({
        next: (data) => {
          expect(data).toEqual(response);
        },
      });

      expect(httpClientMock.post).toHaveBeenCalledWith(
        service.url + '/register',
        mockRegistrar
      );
    });
  });
});
