import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ExpiryTimeService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }
  setWithExpiry(key: any, value: any, ttl: number) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    }

    this.localStorageService.setItem(key, JSON.stringify(item))
    console.log("item:",item);
    
  }

  getWithExpiry(key: any) {
    const itemStr = this.localStorageService.getItem(key)
    if (!itemStr) {
      return true;
    }
    const item = JSON.parse(itemStr) ? JSON.parse(itemStr) : null;
    if (item) {
      const itemExpiry = JSON.parse(item) ? JSON.parse(item) : null;
      // const now = Math.floor(Date.now() / 1000)
      const now = new Date();
      if ( now.getTime() < itemExpiry.expiry) {
        this.localStorageService.removeItem(key);
        console.log("remove item");
        
        return true;
      }
    }
    // return item.value
    return false;
  }
}
