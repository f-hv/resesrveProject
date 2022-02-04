import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  formRegister: FormGroup;
  isClickOnSaveBtn = false;
  keyUser: any;
  data = {
    firstName: null,
    email: null,
    userName: null,
    password: null,
    passConfrim: null
  }
  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initial()
  }

  initial() {
    this.formRegister = this.fb.group({
      firstName: [this.data.firstName, Validators.required],
      email: [this.data.email, [Validators.required, Validators.pattern("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")]],
      userName: [this.data.userName, [Validators.required, Validators.minLength(5)]],
      password: [this.data.password, [Validators.required, Validators.minLength(5)]],
      passconfirm: [this.data.passConfrim, Validators.required]
    })
  }

  cancel() {
    this.navigate();
  }
  save() {
    this.isClickOnSaveBtn = true;
    if (this.formRegister.valid) {
      this.keyUser = this.formRegister.get('userName')?.value;
      const resualt = this.localStorageService.getItem(this.keyUser);
      if (!resualt) {
        this.localStorageService.setItem(this.keyUser, this.formRegister?.value);
        this.navigate();
      }
      else
        console.log("این کاربر قبلا ثبت نام شده");

    }
  }
  navigate() {
    this.router.navigate(['../login'], {
      relativeTo: this.activatedRoute
    })
  }
}
