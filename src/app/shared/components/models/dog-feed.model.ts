export interface DogFeedResponse {
  id: string;
  name: string;
  description: string;
  raceName: string;
  gender: string;
  ageRange: string;
  size: string;
  energyLevel: string;
  mainImageUrl: string | null;
  shelterName: string;
  distanceInKm: number;
  personalities: string[];
  compatibilities: string[];
  specialNeeds: string[];
  medicalHistories: string[];
}

export interface DogInteractionRequest {
  dogId: string;
  isLike: boolean;
}