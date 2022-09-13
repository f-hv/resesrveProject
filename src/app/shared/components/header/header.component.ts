import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown'
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { UserRoleEnum } from '../../enums/user-role.enum';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dropdownSettings: IDropdownSettings;
  userMenu: any[] = [];
  infoUser: any = { name: null, img: null, role: null };
  userName: any;
  p: any = 1;
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) { }
  get roleUser() {
    return UserRoleEnum
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.infoUser.name = user?.name;
        this.infoUser.img = user.img;
        this.infoUser.role = user.role
      }
      else {
        let userLC =JSON.parse( LocalStorageService.read('currentUser'));
        if (userLC) {
          this.infoUser.name = userLC?.userName;
          this.infoUser.img = userLC?.img;
          this.infoUser.role = userLC.role
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
      if (this.infoUser.role == UserRoleEnum.ADMIN)
        this.router.navigate(['../admin/dashboard'], {
          relativeTo: this.activatedRoute
        })
        if (this.infoUser.role == UserRoleEnum.USER )
        this.router.navigate(['../client/profile'], {
          relativeTo: this.activatedRoute
        })
    }
  }
}