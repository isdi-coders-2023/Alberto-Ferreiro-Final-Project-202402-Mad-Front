import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreatePolicyDto, Policy } from '../models/policy.model';

@Injectable({
  providedIn: 'root',
})
export class PoliciesRepoService {
  constructor(private http: HttpClient) {}
  url = environment.apiUrl + '/policies';

  getPolicies() {
    return this.http.get<Policy[]>(this.url);
  }
  createPolicy(data: CreatePolicyDto) {
    return this.http.post<Policy>(`${this.url}/create`, data);
  }
  getUserPolicies(userId: string) {
    return this.http.get<Policy[]>(`${this.url}/user/${userId}`);
  }
}
