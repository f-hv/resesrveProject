import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin:FormGroup;
  data = {
    userName: null,
    password: null,
  }
  isClickOnSaveBtn=false;
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private authService:AuthService,
  ) { }

  ngOnInit(): void {
    this.initial();
  }
  initial(){
    this.formLogin=this.fb.group({
      userName:[this.data.userName,Validators.required],
      password: [this.data.password,Validators.required],
    })
  }
  login(){
    this.isClickOnSaveBtn=true;
    const userName=this.formLogin.get('userName')?.value;
    const password=this.formLogin.get('password')?.value;
    const resLogin = this.authService.login(userName,password)
    if(resLogin){  
      console.log("login success");        
    }
    else
     console.log("login faild");
     
  }
  logout(){
    this.authService.logout();
    this.navigate();
  }
  navigate() {
    this.router.navigate(['../register'], {
      relativeTo: this.activatedRoute
    })
  }

}
