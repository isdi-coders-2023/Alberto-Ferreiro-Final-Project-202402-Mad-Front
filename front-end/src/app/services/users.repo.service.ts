import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserLoginDto } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersRepoService {
  constructor(private http: HttpClient) {}
  url = environment.apiUrl + '/users';
  login(data: UserLoginDto) {
    return this.http.post<{ token: string }>(this.url + '/login', data);
  }
  register(data: FormData) {
    const url = this.url + '/register';
    return this.http.post(url, data);
  }
  getById(id: string) {
    return this.http.get(this.url + '/' + id);
  }
}
