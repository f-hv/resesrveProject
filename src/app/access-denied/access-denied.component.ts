import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {
  isLogedUser:boolean=false;
  constructor(
    private authService:AuthService,
    private router:Router,
    private location:Location
  ) { }

  ngOnInit(): void { 
    this.isLogedUser=this.authService.isLoggedIn();
  }

  backToUrl(){
    this.location.back();
   }

}
