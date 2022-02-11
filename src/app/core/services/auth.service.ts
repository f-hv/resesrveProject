import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser$:BehaviorSubject<any> = new BehaviorSubject(null);
  users: any;
  redirectUrl:string
  constructor(
    private localStorageService:LocalStorageService
  ) { }
  login(userName: any, password: any) {
    const usersLC = this.localStorageService.getItem('users');
    if (usersLC)
      this.users = JSON.parse(usersLC) ? JSON.parse(usersLC) : null;
    if (this.users)
      this.users = JSON.parse(this.users);
    const validUser = this.users.find((data: any) => (userName === data.userName && password === data.password));
    if (validUser) {
      this.localStorageService.setItem('currentUser', JSON.stringify(validUser));
      this.currentUser$.next(validUser);
      console.log(this.currentUser$.value);      
      return true;
    }
    else
      return false;
  }
  logout() {
    debugger
    this.localStorageService.removeItem('localUser');
    this.currentUser$.next(null);
  }
  isLoggedIn(){
    if(this.currentUser$?.value=== '')
      return true;
    else
      return false;
  }
  
}
