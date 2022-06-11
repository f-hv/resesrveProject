import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExpiryTimeService } from './expiry-time.service';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';

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
    private expiryTimeService: ExpiryTimeService,
    private userService: UserService
  ) { }
  login(userName: any, password: any) {
    this.users = this.userService.getParseData("users");
    const validUser = this.users.find((data: any) => (userName === data.userName && password === data.password && data.deleted === 0));
    if (validUser) {
      this.expiryTimeService.setWithExpiry('expiryTime', 'currentUser', 10000);
      this.localStorageService.setItem('currentUser', JSON.stringify(validUser));
      this.currentUser$.next(validUser);
      return true;
    }
    else return false;
  }
  logout() {
    this.localStorageService.removeItem('currentUser');
    this.currentUser$.next(null);
    this.localStorageService.removeItem("expiryTime");
  }
  isLoggedIn() {
    debugger
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
