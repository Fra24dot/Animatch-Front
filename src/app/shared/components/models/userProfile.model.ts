export interface UserProfileRequest {
  familyCondition: {
    city: string;
    housingType: number;
    peopleCount: number;
    hasChildren: boolean;
    petsAllowed: boolean;
  };
  experience: {
    hasAnimals: boolean;
    animalsCount: number;
    animalType: number;
    alreadyAdopted: boolean;
    adoptionPermit: boolean;
  };
  lifestyle: {
    jobType: number;
    remoteWork: boolean;
    dogAloneHours: number;
    activeLifestyle: boolean;
    financiallyStable: boolean;
  };
}