import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Policy } from '../models/policy.model';

@Injectable({
  providedIn: 'root',
})
export class PoliciesRepoService {
  constructor(private http: HttpClient) {}
  url = environment.apiUrl + '/policies';

  getPolicies() {
    return this.http.get<Policy[]>(this.url);
  }
}
