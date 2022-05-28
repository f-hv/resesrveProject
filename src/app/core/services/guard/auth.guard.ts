import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService:ToastrService,
    ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.checkLoggedIn(state.url) === true) {
      const user = this.authService.currentUser$.value;
      if (user) {
        if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
          this.router.navigate(['../accessDenied']);
          return false;
        }        
        return true;
      }
      else  {
        this.toastrService.error('please login.','sorry!');
        this.router.navigate(['../login']);
        return false;
      }
    }
    else {
      this.toastrService.error('please login.','sorry!');
      this.router.navigate(['../login']);
      return false;
    }
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
