import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() { }

  static read<T>(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key)||'null');
    } catch (e) {
      return localStorage.getItem(key);
    }
  }

  static save<T>(key: string, itemValue: T): void {
    localStorage.setItem(key, JSON.stringify(itemValue));
  }

  static delete(key: string): void {
    localStorage.removeItem(key);
  }

  static addToArray<T>(key: string, value: T): boolean {
    let storage = this.read<T[]>(key) || [];
    storage.push(value);
    this.save(key, storage);
    return storage;
  }

  static removeFromArray<T>(key: string, index: number): boolean {
    let storage = this.read<T[]>(key) || [];
    if (index == -1) return storage;
    storage.splice(index, 1);
    this.save(key, storage);
    return storage;
  }
  public length(): number {
    return localStorage.length;
  }
}
