import { ShelterRegister } from './auth.model';

export enum ShelterStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2
}

export interface Shelter extends ShelterRegister {
  id: string;
  shelterStatus: ShelterStatus;
  isVerified: boolean;
  isActive: boolean;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt?: string;
}