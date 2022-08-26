import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  formAdmin: FormGroup;
  dataUser: UserModel;
  userName: any;
  email: any;

  isClickSavePassBtn = false;
  isClickOnSaveBtn = false;
  // resetPass////
  passInfo = { currentPass: null, newPass: null };
  currentUserInfo: any;
  passLC: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.dataUser = user;
      this.passLC = user.password;

    })
    console.log("pass:",this.passLC);
    
    this.initial();
  }
  initial() {
    this.formAdmin = this.fb.group({
      id: [this.dataUser?.id],
      firstName: [this.dataUser?.firstName],
      email: [this.dataUser?.email, [Validators.pattern("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")]],
      userName: [this.dataUser?.userName, [Validators.minLength(5)]],
      password: [this.dataUser?.password, [Validators.minLength(5)]],
      role: [this.dataUser?.role],
      deleted: 0
    })
  }
  save() {
    const users = LocalStorageService.read("users");
    users.map((user: any) => {
      if (user.userName === this.userName && user.email === this.email) {
        user.firstName = this.formAdmin.get('firstName')?.value;
        user.userName = this.formAdmin.get('userName')?.value;
        user.email = this.formAdmin.get('email')?.value;
        LocalStorageService.save("users", JSON.stringify(users));
        LocalStorageService.save("currentUser", JSON.stringify(this.formAdmin?.value));
        this.authService.currentUser$.next(this.formAdmin?.value);
        this.toastrService.success('Your profile information changed successfully', 'success');
      }
    });
  }
  resetPassword(item: any) {
    this.isClickSavePassBtn = true;
    const usersLC = LocalStorageService.read("users");
    usersLC.map((user: any) => {
      if (user.userName === this.dataUser.userName && user.email === this.dataUser.email) {
        user.password = item;
        user.passconfirm =item;
        this.dataUser.password = item;
        this.dataUser.passconfirm = item;
        LocalStorageService.save("users", JSON.stringify(usersLC));
        LocalStorageService.save("currentUser", JSON.stringify(this.dataUser));
        this.authService.currentUser$.next(usersLC);
        this.toastrService.success('The password changed successfully', 'success');
        this.clearForm();
      }
    })
  }
  clearForm() {
    this.passInfo.currentPass = null;
    this.passInfo.newPass = null;
    this.isClickSavePassBtn = false;
  }
}
