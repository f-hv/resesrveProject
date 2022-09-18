import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ExpiryTimeService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }
  setExpiry(key: any, value: any, ttl: number) {
    const item = {
      value: value,
      expiry: Date.now() + (ttl*1000),
    }
    LocalStorageService.save(key, JSON.stringify(item))
  }

  getExpiry(key: any) {
    const expireKey = JSON.parse(LocalStorageService.read(key)||'null');    
    if (!expireKey) {
      return false;
    }
    if (Date.now() > expireKey.ttl) {
      LocalStorageService.delete(key);
      return false;
    }
    return true /////no expired
  }
}
