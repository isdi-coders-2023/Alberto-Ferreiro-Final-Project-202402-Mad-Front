import { Injectable } from '@angular/core';
import { Policy } from '../models/policy.model';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UsersRepoService } from './users.repo.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { PoliciesRepoService } from './policies.repo.service';

type LoginState = 'idle' | 'logging' | 'logged' | 'error';
export type Payload = {
  id: string;
  role: string;
} & JwtPayload;

export type State = {
  loginState: LoginState;
  token: string | null;
  currentPayload: Payload | null;
  currentUser: unknown | null;
  policies: Policy[];
};

const initialState: State = {
  loginState: 'idle',
  token: null,
  currentPayload: null,
  currentUser: null,
  policies: [],
};

@Injectable({
  providedIn: 'root',
})
export class StateService {
  protected state$ = new BehaviorSubject<State>(initialState);
  constructor(
    private usersRepo: UsersRepoService,
    private polRepo: PoliciesRepoService
  ) {}

  checkPersistence() {
    const storageItem = localStorage.getItem('Umbrella');
    if (storageItem) {
      const { token } = JSON.parse(storageItem);
      if (token) {
        this.setLogin(token);
      }
    }
  }
  getState(): Observable<State> {
    return this.state$.asObservable();
  }

  get state(): State {
    return this.state$.value;
  }

  setLoginState(loginState: LoginState): void {
    this.state$.next({ ...this.state$.value, loginState });
  }

  setLogin(token: string) {
    const currentPayload = jwtDecode(token) as Payload;
    localStorage.setItem('Umbrella', JSON.stringify({ token }));
    this.usersRepo.getById(currentPayload.id).subscribe((user) => {
      this.state$.next({
        ...this.state$.value,
        loginState: 'logged',
        token,
        currentPayload,
        currentUser: user,
      });
      console.log('Usuario logado');
      console.log(this.state.loginState);
    });
  }
  setLogout() {
    localStorage.removeItem('Umbrella');
    this.state$.next({
      ...this.state$.value,
      loginState: 'idle',
      token: null,
      currentPayload: null,
    });
  }
  getPolicies() {
    this.polRepo.getPolicies().subscribe((policies) => {
      this.state$.next({ ...this.state$.value, policies });
    });
  }
}
