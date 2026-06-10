export enum DogStatus {
  Available = 'Available',
  Adopted = 'Adopted',
  Reserved = 'Reserved'
}


export interface AddDogRequest {
  name: string;
  race: number;        
  description: string;
  gender: number;      
  ageRange: number;    
  size: number;        
  energyLevel: number; 
  mediaFile?: File;    
  personalityIds: number[];
  specialNeedsIds: number[];
  compatibilityIds: number[];
  medicalHistoryIds: number[];
}


export interface DogDetailResponse {
  id: string;
  name: string;
  race: string;
  description: string;
  gender: string;
  status: DogStatus;
  ageRange: string;
  size: string;
  energyLevel: string;
  createdAt: string;
  imageBase64: string; 
  personalityIds: number[];
  specialNeedsIds: number[];
  compatibilityIds: number[];
  compatibilityNames?: string[];
}