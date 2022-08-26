import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
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
  passLC: any;
  passInfo = { currentPass: null, newPass: null };
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user:any)=>{
      this.dataUser=user;
      this.passLC=user.password
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
      this.toastrService.success('update succesfull');
    else
      this.toastrService.success('failed update');
  }
  cancel() {
    this.dataUser = this.listOrginalUser;
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
