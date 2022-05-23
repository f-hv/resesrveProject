import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersModule } from 'src/app/admin/users/users.module';
import { UserModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  dataUser: UserModel;
  listOrginalUser: any;
  formUser: FormGroup;
  isClickOnSaveBtn: Boolean = false;
  /////////ResetPassword////////////
  isClickSavePassBtn: Boolean = false;
  passLC:any;
  passInfo = { currentPass: null, newPass: null };
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.dataUser = user;
      this.passLC=user.password;
    })
    this.listOrginalUser = [...[this.dataUser]];
    this.initial();
  }
  initial() {
    this.formUser = this.formBuilder.group({
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
    this.isClickOnSaveBtn = true;
    const resualt = this.userService.update(this.formUser.value);
    if (resualt)
      this.toastrService.success('delete succesfull');
    else
      this.toastrService.success('failed deleted');
  }
  cancel() {
    this.dataUser = this.listOrginalUser;
  }
  resetPassword(item: any) {
    this.isClickSavePassBtn = true;
    if (this.passLC === item.currentPass) {
      // const currentUserInfo= item.newPass;
      const usersLC = this.userService.getParseData("users");
        usersLC.map((user: any) => {
          if (user.userName === this.dataUser.userName && user.email === this.dataUser.email) {
            user.password = this.passLC;
            user.passconfirm = this.passLC;
            this.localStorageService.setItem("users", JSON.stringify(users));
            this.localStorageService.setItem("currentUser", JSON.stringify(this.currentUserInfo));
            this.authService.currentUser$.next(this.currentUserInfo);
            this.toastrService.success('The password changed successfully', 'success');
            this.clearForm();
          }
        })
      }
    }
  }
}
