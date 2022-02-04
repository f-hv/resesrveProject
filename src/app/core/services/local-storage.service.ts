import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
    // The value is stored as a JSON string. This method does not return anything
  
  public setItem(key: string, value: string | JSON): void {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
  }

  public getItem(key: string): string | JSON | null {
    ////// If this lookup fails it will return a null value.
    return localStorage.getItem(key);
  }
  public removeItem(key: string) {
    localStorage.removeItem(key);
  }
  public clear() {
    localStorage.clear();
  }
}
