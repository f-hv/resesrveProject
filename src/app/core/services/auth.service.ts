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
    const users =LocalStorageService.read("users");
    const validUser = users.find((data: any) => (userName === data.userName && password === data.password && data.deleted === 0));
    if (validUser) {
      LocalStorageService.save('currentUser', JSON.stringify(validUser));
      this.expiryTimeService.setExpiry('expiryTime', 'currentUser', 50);
      this.currentUser$.next(validUser);
      return true;
    }
    else return false;
  }

  logout() {
    debugger
    LocalStorageService.delete('currentUser');
    LocalStorageService.delete("expiryTime");
    this.currentUser$.next(null);
  }

  isLoggedIn() {
    if (this.currentUser$?.value) {
      if (this.expiryTimeService.getExpiry('expiryTime'))
        return true;
    }
    else {
      let user =JSON.parse( LocalStorageService.read('currentUser')|| 'null');
      if (user) {
        if (this.expiryTimeService.getExpiry('expiryTime')) {
          this.currentUser$.next(user);
          return true
        }
        else
          return false;
      }
    }
    return false;
  }
}
