import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Claim } from '../models/claims.model';

@Injectable({
  providedIn: 'root',
})
export class ClaimsRepoService {
  private url = `${environment.apiUrl}/claims`;

  constructor(private http: HttpClient) {}

  getClaimsByPolicyId(policyId: string) {
    return this.http.get<Claim[]>(`${this.url}/policy/${policyId}`);
  }

  createClaim(policyId: string, claim: FormData) {
    console.log('En el repo de Angular:', claim);
    return this.http.post<Claim>(`${this.url}/policy/${policyId}`, claim);
  }
}
