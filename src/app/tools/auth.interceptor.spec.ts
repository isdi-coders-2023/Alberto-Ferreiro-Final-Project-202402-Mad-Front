import { TestBed } from '@angular/core/testing';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

import { authInterceptor } from './auth.interceptor';
import { StateService } from '../services/state.service';
import { of } from 'rxjs';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));
  const mockState = {
    state: { loginState: 'logged', token: 'soy el token bro' },
  };
  const fakeState = {
    state: { loginState: 'idle', token: '' },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: StateService, useValue: mockState }],
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
  it('should return authenticated request if user is logged', () => {
    const req = {
      clone: () => {},
    } as HttpRequest<unknown>;
    const finalReq = {
      setHeaders: {
        Authorization: `Bearer ${fakeState.state.token}`,
      },
    } as unknown as HttpRequest<unknown>;
    const next: HttpHandlerFn = (req) => {
      return of(req as unknown as HttpEvent<unknown>);
    };

    const http = {
      httpNext: next,
    };

    spyOn(req, 'clone').and.returnValue(finalReq);
    spyOn(http, 'httpNext').and.callThrough();
    interceptor(req, http.httpNext);
    expect(http.httpNext).not.toHaveBeenCalledWith(req);
    expect(http.httpNext).toHaveBeenCalledWith(finalReq);
  });
  it('should next the request if user is not logged', () => {
    TestBed.overrideProvider(StateService, { useValue: fakeState });
    const req = {
      clone: () => {},
    } as HttpRequest<unknown>;

    const next: HttpHandlerFn = (req) => {
      return of(req as unknown as HttpEvent<unknown>);
    };

    const http = {
      httpNext: next,
    };
    spyOn(req, 'clone');
    spyOn(http, 'httpNext').and.callThrough();
    interceptor(req, http.httpNext);
    expect(http.httpNext).toHaveBeenCalledWith(req);
    expect(req.clone).not.toHaveBeenCalled();
  });
});
