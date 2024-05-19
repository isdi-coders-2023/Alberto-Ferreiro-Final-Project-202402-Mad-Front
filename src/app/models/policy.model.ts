import { Claim } from './claims.model';

export type Policy = {
  id: string;
  policyType: string;
  carMake: string;
  carModel: string;
  policyNumber: number;
  plateNumber: string;
  carAge: number;
  userId: string;
  claims: Claim[];
};

export type CreatePolicyDto = {
  carMake: string;
  carModel: string;
  policyType: string;
  plateNumber: string;
  carAge: number;
  userId: string;
};
