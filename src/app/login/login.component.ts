import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  data = {
    userName: null,
    password: null,
  }
  isClickOnSaveBtn = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initial();
  }
  initial() {
    this.formLogin = this.fb.group({
      userName: [this.data.userName, Validators.required],
      password: [this.data.password, Validators.required],
    })
  }
  login() {
    this.isClickOnSaveBtn = true;
    const userName = this.formLogin.get('userName')?.value;
    const password = this.formLogin.get('password')?.value;
    const resLogin = this.authService.login(userName, password)
    if (resLogin) {
      if (this.authService.redirectUrl) 
        this.router.navigateByUrl(this.authService.redirectUrl);     
      else this.directToPage();
    }
    else
      this.toastrService.error('username or password is incorrect.', 'sorry!');
      this.refreshPage();
  }
  logout() {
    this.authService.logout();
    this.navigate();
  }
  navigate() {
    this.router.navigate(['../register'], {
      relativeTo: this.activatedRoute
    })
  }
  directToPage() {
    this.authService.currentUser$.subscribe((user: any) => {
      if (user.role === "ADMIN") {
        this.router.navigate(['../admin'], {
          relativeTo: this.activatedRoute
        })
      }
      else {
        this.router.navigate(['../client'], {
          relativeTo: this.activatedRoute
        })
      }
    })
  }
  refreshPage(){
    this.formLogin .setValue({
      userName: '',
      password:'',
    })
    this.isClickOnSaveBtn =false
  }

}
