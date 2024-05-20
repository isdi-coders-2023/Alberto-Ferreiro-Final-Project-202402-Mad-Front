import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  UpdateUserDto,
  User,
  UserLoginDto,
  UserRegisterDto,
} from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersRepoService {
  constructor(private http: HttpClient) {}
  url = environment.apiUrl + '/users';
  login(data: UserLoginDto) {
    console.log('en el repo:', data);
    return this.http.post<{ token: string }>(this.url + '/login', data);
  }
  register(data: UserRegisterDto) {
    console.log('en el repo:', data);
    return this.http.post(this.url + '/register', data);
  }
  getById(id: string): Observable<User> {
    return this.http.get<User>(this.url + '/' + id);
  }
  getDetailsById(id: string): Observable<User> {
    return this.http.get<User>(this.url + '/' + id + '/details');
  }

  updateUser(id: string, data: UpdateUserDto) {
    return this.http.patch<User>(this.url + '/' + id, data);
  }
}
