import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown'
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dropdownSettings: IDropdownSettings;
  userMenu: any[] = [];
  infoUser: any = { name: null, userName: null, password: null, email: null, img: null };
  userName: any;
  p: any = 1;
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.infoUser.userName = user?.userName;
        this.infoUser.password = user?.password;
        this.infoUser.name = user?.name;
        this.infoUser.email = user.email;
        this.infoUser.img = user.img;
      }
      else {
        let userLC = this.userService.getParseData('currentUser');
        if (userLC) {
          this.infoUser.userName = userLC.userName
          this.infoUser.password = userLC?.password;
          this.infoUser.name = userLC?.name;
          this.infoUser.email = userLC?.email;
          this.infoUser.img = userLC?.img;
        }
        else
          this.authService.logout();
      }
    })

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name'
    };
    this.userMenu = [
      { id: 1, name: 'dashboard' },
      { id: 2, name: 'logout' }
    ]
  }
  onAdminSelect(item: any) {
    if (item.name === "logout") {
      this.authService.logout();
      this.router.navigate(['../login'], {
        relativeTo: this.activatedRoute
      })
    }
    if (item.name == "dashboard") {
      this.router.navigate(['./dashboard'], {
        relativeTo: this.activatedRoute
      })
    }
  }
}
