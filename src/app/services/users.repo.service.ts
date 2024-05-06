import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserLoginDto, UserRegisterDto } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersRepoService {
  constructor(private http: HttpClient) {}
  url = environment.apiUrl + '/users';
  login(data: UserLoginDto) {
    return this.http.post<{ token: string }>(this.url + '/login', data);
  }
  register(data: UserRegisterDto) {
    console.log('en el repo:', data);
    return this.http.post(this.url + '/register', data);
  }
  getById(id: string) {
    return this.http.get(this.url + '/' + id);
  }
}
