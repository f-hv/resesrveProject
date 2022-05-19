import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  formAdmin: FormGroup;
  data = {
    firstName: null,
    email: null,
    userName: null,
    password: null,
    passConfrim: null,
    role: null
  }
  userName: any;
  email: any;

  isClickSavePassBtn = false;
  isClickOnSaveBtn = false;
  // resetPass////
  passInfo = { currentPass: null, newPass: null };
  currentUserInfo: any;
  PasswordLC:any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.data = user;
      this.currentUserInfo = user;
      this.userName = user.userName;
      this.email = user.email;
      this.PasswordLC = this.data.password;

    })
    this.initial();
  }
  initial() {
    this.formAdmin = this.fb.group({
      firstName: [this.data.firstName],
      email: [this.data.email, [Validators.pattern("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")]],
      userName: [this.data.userName, [Validators.minLength(5)]],
      password: [this.data.password, [Validators.minLength(5)]],
      role: [this.data.role]
    })
  }
  save() {
    const usersLC = this.localStorageService.getItem("users");
    if (usersLC) {
      let users = JSON.parse(usersLC) ? JSON.parse(usersLC) : null;
      if (users)
        users = JSON.parse(users);
      users.map((user: any) => {
        if (user.userName === this.userName && user.email === this.email) {
          user.firstName = this.formAdmin.get('firstName')?.value;
          user.userName = this.formAdmin.get('userName')?.value;
          user.email = this.formAdmin.get('email')?.value;
          this.localStorageService.setItem("users", JSON.stringify(users));
          this.localStorageService.setItem("currentUser", JSON.stringify(this.formAdmin?.value));
          this.authService.currentUser$.next(this.formAdmin?.value);
          this.toastrService.success('Your profile information changed successfully','success');
        }
      });
    }
  }
  resetPassword(item: any) {
    this.isClickSavePassBtn=true;
    if (this.PasswordLC === item.currentPass) {
      this.currentUserInfo.password = item.newPass;
      const usersLC = this.localStorageService.getItem("users");
      if (usersLC) {
        let users = JSON.parse(usersLC) ? JSON.parse(usersLC) : null;
        if (users)
          users = JSON.parse(users);
        users.map((user: any) => {
          if (user.userName === this.userName && user.email === this.email) {
            user.password = this.currentUserInfo.password;
            user.passconfirm = this.currentUserInfo.password;
            this.localStorageService.setItem("users", JSON.stringify(users));
            this.localStorageService.setItem("currentUser", JSON.stringify(this.currentUserInfo));
            this.authService.currentUser$.next(this.currentUserInfo);
            this.toastrService.success('The password changed successfully','success');
            this.clearForm();
          }
        })
      }
    }
    else 
    // this.toastrService.error('Your current password is incorrect.');
    return;
  }
  clearForm(){
    this.passInfo.currentPass=null;
    this.passInfo.newPass=null;
    this.isClickSavePassBtn=false;
  }
}
