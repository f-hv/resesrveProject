
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserModel } from '../core/models/user.model';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { UserRoleEnum } from '../shared/enums/user-role.enum';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  @Input() id: any;
  formRegister: FormGroup;
  users: UserModel[];
  dataUser: UserModel | undefined;
  isAdmin: Boolean = false;
  isClickOnSaveBtn = false;

  ////directive/////
  directRole = "ADMIN"

  //// dropdown/////
  dropdownSettings: IDropdownSettings;
  selectedRole: any;
  roleUser = UserRoleEnum;
  listRoles: any[] = [];
  check = 1
  isSelectRole: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toastrService: ToastrService,
    private userService: UserService
  ) {
    this.listRoles = Object.keys(this.roleUser);
  }

  ngOnInit(): void {
    if (this.id) {
      this.getData();
    }
    this.users = LocalStorageService.read('users');
    console.log(this.users);
    
    this.initial()
    this.setUserValidateRole();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 20,
    };
  }
  getData() {
    this.dataUser = this.userService.getById(this.id);
  }

  initial() {
    this.formRegister = this.fb.group({
      id: [this.dataUser?.id],
      firstName: [this.dataUser?.firstName, Validators.required],
      userName: [this.dataUser?.userName, [Validators.required, Validators.minLength(5)]],
      password: [this.dataUser?.password, [Validators.required, Validators.minLength(5)]],
      passconfirm: [this.dataUser?.passconfirm, Validators.required],
      email: [this.dataUser?.email, [Validators.required, Validators.pattern("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")]],
      role: [this.isSelectRole ? this.selectedRole : 'USER'],
      img: ['assets/pic/profile2.jpg'],
      deleted: 0

    })
  }
  cancel() {
    this.navigate();
  }
  save() {
    this.isClickOnSaveBtn = true;
    if (this.formRegister?.valid) {
      if (this.selectedRole)
        this.formRegister.get('role')?.setValue(this.selectedRole);
      if (this.id) {
        this.update();
      }
      else
        this.create();
    }
  }
  navigate() {
    this.authService.currentUser$.subscribe((user: any) => {
      if (user && user?.role === "ADMIN")
        this.isAdmin = true;
    })
    if (this.id) {
      this.router.navigate(['../../../users'], {
        relativeTo: this.activatedRoute
      })
    }
    else {
      this.router.navigate([this.isAdmin ? '../users' : '../login'], {
        relativeTo: this.activatedRoute
      })
    }
  }
  onRoleSelect(item: any) {
    this.selectedRole = '';
    this.isSelectRole = true;
    const newRole = this.listRoles.find(role => role === item);
    if (this.selectedRole)
      this.selectedRole = newRole;
    else this.selectedRole = "USER"
  }
  setUserValidateRole() {
    this.authService.currentUser$.subscribe((user: any) => {
      if (user && user.role === "ADMIN") {
        this.formRegister.get('role')?.setValidators(Validators.required);
      }
      else {
        this.formRegister.get('role')?.clearValidators();
      }
      this.formRegister.get('role')?.updateValueAndValidity();
    })
  }
  update() {
    const validUser = this.userService.update(this.formRegister.value);
    if (validUser) {
      this.toastrService.success('ویرایش کاربر با موفقیت انجام شد.');
      this.navigate();
    }
    else
      this.toastrService.error('کاربر با این مشخصات وجود ندارد');
  }
  create() {
    const resualt = this.userService.create(this.formRegister?.value);
    resualt ? this.toastrService.success('کاربر با موفقیت ثبت شد.') && this.navigate() :this.toastrService.error('خطایی رخ داده است') ;
  }
}


