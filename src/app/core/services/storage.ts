import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  setLocal<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getLocal<T>(key: string): T | null {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) as T : null;
  }

  removeLocal(key: string): void {
    sessionStorage.removeItem(key);
  }

  clearLocal(): void {
    sessionStorage.clear();
  }
}
