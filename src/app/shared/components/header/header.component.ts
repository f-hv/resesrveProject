import { Component, OnInit } from '@angular/core';
import {IDropdownSettings } from 'ng-multiselect-dropdown'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dropdownSettings :IDropdownSettings;
  adminData: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.dropdownSettings= {
      singleSelection: true,
      idField: 'id',
      textField: 'name'
    };
    this.adminData=[
      {id:1 , name:'پروفایل'},
      {id:1 , name:'خروج'}
    ]
  }




onAdminSelect(item: any){
  // if(item.id===1){
  //   this.router.navigate([''])
  // }
}
}
