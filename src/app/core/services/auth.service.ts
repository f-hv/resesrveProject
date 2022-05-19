import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExpiryTimeService } from './expiry-time.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser$: BehaviorSubject<any> = new BehaviorSubject(null);
  users: any;
  logedUser: any;
  redirectUrl: string
  constructor(
    private localStorageService: LocalStorageService,
    private expiryTimeService: ExpiryTimeService
  ) { }
  login(userName: any, password: any) {
    const usersLC = this.localStorageService.getItem('users');
    if (usersLC) {
      this.users = JSON.parse(usersLC) ? JSON.parse(usersLC) : null;
      if (this.users)
        this.users = JSON.parse(this.users);
      const validUser = this.users.find((data: any) => (userName === data.userName && password === data.password));
      if (validUser) {
        this.localStorageService.setItem('currentUser', JSON.stringify(validUser));
        this.currentUser$.next(validUser);
        this.expiryTimeService.setWithExpiry('expiryTime', 'currentUser',10000);
        return true;
      }
      else return false;
    }
    else return false;
  }
  logout() {
    this.localStorageService.removeItem('currentUser');
    this.currentUser$.next(null);
  }
  isLoggedIn() {   
    if (this.currentUser$?.value) {
      if (!this.expiryTimeService.getWithExpiry('expiryTime'))
        return true;

      else
        return false;
    }
    else {
      let user = this.localStorageService.getItem('currentUser');
      if (user) {
        if (!this.expiryTimeService.getWithExpiry('expiryTime')) {
          this.logedUser = JSON.parse(user) ? JSON.parse(user) : null;
          this.logedUser = JSON.parse(this.logedUser);
          this.currentUser$.next(this.logedUser);
          return true
        }
        else
          return false;
      }
      else
        return false;
    }
  }
}
