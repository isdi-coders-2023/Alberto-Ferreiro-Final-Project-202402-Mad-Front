import { Policy } from './policy.model';

export type UserLoginDto = {
  email: string;
  password: string;
};

export type UserRegisterDto = {
  name: string;
  email: string;
  age: number;
  licenseYear: number;
  password: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  licenseYear: number;
  bankAccount: string;
  policies: Policy[];
};

export type UpdateUserDto = {
  name?: string;
  email?: string;
  age?: number;
  licenseYear?: string;
  bankAccount?: string;
};
