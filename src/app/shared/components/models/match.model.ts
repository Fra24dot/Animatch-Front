export interface AdopterMatch {
  matchId: string;
  dogId: string;
  dogName: string;
  dogImageUrl: string | null;
  status: 'Pending' | 'Accepted' | 'Refused';
  createdAt: string;
}

export interface ShelterIncomingLike {
  matchId: string;
  dogId: string;
  dogName: string;
  dogImageUrl: string | null; 
  adopterId: string;
  adopterFirstName: string;
  adopterLastName: string;
  likedAt: string;
}