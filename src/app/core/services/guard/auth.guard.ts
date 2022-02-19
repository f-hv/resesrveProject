import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.checkLoggedIn(state.url) === true) {
      const user = this.authService.currentUser$.value;
      if (user) {
        // check if route is restricted by role
        if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
          // role not authorised so redirect to home page
          this.router.navigate(['../accessDenied']);
          return false;
        }
        // authorised so return true
        return true;
      }
    }
    else 
      this.router.navigate(['../login']);
      return false;
  }
  checkLoggedIn(url: string): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    else {
      this.authService.redirectUrl = url;
      return false;
    }
  }
}
