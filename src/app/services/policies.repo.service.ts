import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  CreatePolicyDto,
  Policy,
  UpdatePolicyDto,
} from '../models/policy.model';
import { Claim } from '../models/claims.model';

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
  getById(id: string) {
    return this.http.get<Policy>(`${this.url}/${id}`);
  }
  updatePolicy(id: string, data: UpdatePolicyDto) {
    return this.http.patch<Policy>(`${this.url}/${id}`, data);
  }

  deletePolicy(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getClaimsByPolicyId(policyId: string) {
    return this.http.get<Claim[]>(
      `${environment.apiUrl}/claims/policy/${policyId}`
    );
  }

  createClaim(data: Claim) {
    return this.http.post<Claim>(`${environment.apiUrl}/claims`, data);
  }
}
