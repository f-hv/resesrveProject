import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExpiryTimeService } from './expiry-time.service';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  resualt: boolean = false;
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
    const users =JSON.parse( LocalStorageService.read("users"));
    const validUser = users.find((data: any) => (userName === data.userName && password === data.password && data.deleted === 0));
    if (validUser) {
      LocalStorageService.save('currentUser', JSON.stringify(validUser));
      this.expiryTimeService.setExpiry('expiryTime', userName, 5);
      this.currentUser$.next(validUser);
      return true;
    }
    else return false;
  }

  logout() {
    LocalStorageService.delete('currentUser');
    LocalStorageService.delete("expiryTime");
    this.currentUser$.next(null);
  }


  isLoggedIn() {
    if (this.currentUser$?.value)
      this.resualt = this.expiryTimeService.getExpiry('expiryTime') ? true : false;
    else {
      var user = JSON.parse(LocalStorageService.read('currentUser') || 'null');
      if (user) {
        if (this.expiryTimeService.getExpiry('expiryTime')) {
          this.currentUser$.next(user);
          this.resualt = true
        }
        else this.resualt = false;
      }
    }
    return this.resualt
  }
}
