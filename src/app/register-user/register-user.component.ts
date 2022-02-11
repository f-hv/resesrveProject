import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Role } from '../core/models/roles.model';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  formRegister: FormGroup;
  users: any[] = [];
  data = {
    firstName: null,
    email: null,
    userName: null,
    password: null,
    passConfrim: null,
    role:null
  }
  isClickOnSaveBtn = false;
  ////directive/////
  directRole="ADMIN"
  //// dropdown/////
  dropdownSettings:IDropdownSettings;
  selectedRole:any;
  enume=Role;
  listRoles:any[]=[];
  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.listRoles=Object.keys(this.enume);
  }
  ngOnInit(): void {          
    this.initial()
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 20,
    };
  }
  initial() {
    this.formRegister = this.fb.group({
      firstName: [this.data.firstName, Validators.required],
      email: [this.data.email, [Validators.required, Validators.pattern("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")]],
      userName: [this.data.userName, [Validators.required, Validators.minLength(5)]],
      password: [this.data.password, [Validators.required, Validators.minLength(5)]],
      passconfirm: [this.data.passConfrim, Validators.required],
      role:[this.selectedRole,Validators.required]
    })
  }
  cancel() {
    this.navigate();
  }
  save() {
    this.isClickOnSaveBtn = true;
    if (this.formRegister?.valid) {
      this.formRegister.get('role')?.setValue(this.selectedRole);
      if (this.localStorageService.getItem("users") === null) {
        this.localStorageService.setItem("users", JSON.stringify([this.formRegister?.value]));
        
        console.log("کاربر با موفقیت ثبت شد");
        this.navigate();
      }
      else {
        const usersLC = this.localStorageService.getItem("users");
        if (usersLC) {
          let users = JSON.parse(usersLC) ? JSON.parse(usersLC) : null;
          if (users)
            users = JSON.parse(users) ? JSON.parse(users) : null;
          const validUser = users.find((item: any) => item.userName === this.formRegister?.get('userName')?.value || item.email === this.formRegister?.get('email')?.value);
          if (!validUser) {
            users.push(this.formRegister.value);
            this.localStorageService.setItem("users", JSON.stringify(users));
            console.log("کاربر با موفقیت ثبت شد");
            this.navigate();
          }
          else
            console.log("کاربر با این مشخصات قبلا ثبت نام شده");
        }
      }
    }
  }
  navigate() {
    this.router.navigate(['../login'], {
      relativeTo: this.activatedRoute
    })
  }
  onRoleSelect(item: any) {
    this.selectedRole = '';
    const selectedSource = this.listRoles.find(role => role === item);
    this.selectedRole = selectedSource;   
  }
}
