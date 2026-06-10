import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddDogRequest, DogDetailResponse } from '../../shared/components/models/dog.model';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ShelterDogService {
    private readonly http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/api/shelterdog`

    addDog(dto: AddDogRequest): Observable<{ message: string; dog: DogDetailResponse }> {
    const formData = new FormData();

    
    formData.append('name', dto.name);
    formData.append('race', dto.race.toString());
    formData.append('description', dto.description);
    formData.append('gender', dto.gender.toString());
    formData.append('ageRange', dto.ageRange.toString());
    formData.append('size', dto.size.toString());
    formData.append('energyLevel', dto.energyLevel.toString());

    
    if (dto.mediaFile) {
      formData.append('mediaFile', dto.mediaFile, dto.mediaFile.name);
    }

    
    dto.personalityIds.forEach(id => formData.append('personalityIds', id.toString()));
    dto.specialNeedsIds.forEach(id => formData.append('specialNeedsIds', id.toString()));
    dto.compatibilityIds.forEach(id => formData.append('compatibilityIds', id.toString()));
    dto.medicalHistoryIds.forEach(id => formData.append('medicalHistoryIds', id.toString()));

    return this.http.post<{ message: string; dog: DogDetailResponse }>(`${this.apiUrl}/add-dog`, formData);
  }

}