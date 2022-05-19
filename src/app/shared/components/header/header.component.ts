import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown'
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dropdownSettings: IDropdownSettings;
  adminMenu: any[] = [];
  userName: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.userName = user.userName;      
    })
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name'
    };
    this.adminMenu = [
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
    if (item.name =="dashboard") {
      this.router.navigate(['./dashboard'], {
        relativeTo: this.activatedRoute
      })
    }
  }
}
