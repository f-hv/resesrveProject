import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-client-sidebar',
  templateUrl: './client-sidebar.component.html',
  styleUrls: ['./client-sidebar.component.scss']
})
export class ClientSidebarComponent implements OnInit {
  @Input() navbarOpen = false;
  userImg: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private activetedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (user)
        this.userImg = user.img;
      else {
        let userLC = this.userService.getParseData('currentUser');
        if (userLC)
          this.userImg = user.img;
        else
          this.authService.logout();
      }
    })
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['../login'], {
      relativeTo: this.activetedRoute
    })
  }

}
