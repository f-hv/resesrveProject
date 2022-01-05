import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  dropdownSettings={};
  adminData:any[]=[];
  constructor(
    private router:Router,
    private activetedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name'
    };
    this.adminData=[
      {id:1 , name:'پروفایل'},
      {id:1 , name:'خروج'}
    ]
  }
  onAdminSelect(item:any){
    // if(item.id===1){
    //   this.router.navigate([''])
    // }
  }

}
