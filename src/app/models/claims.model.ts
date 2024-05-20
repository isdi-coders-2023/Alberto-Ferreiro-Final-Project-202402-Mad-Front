export type Claim = {
  id: string;
  policyId: string;
  operatorId?: string;
  status: string;
  type: string;
  phoneNumber: string;
  address: string;
  claimNumber: number;
  imageUrl?: string;
};
