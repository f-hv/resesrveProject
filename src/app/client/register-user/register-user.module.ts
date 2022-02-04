import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterUserRoutingModule } from './register-user-routing.module';
import { RegisterUserComponent } from './register-user.component';
import { RouterModule } from '@angular/router';
import { sharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ RegisterUserComponent],
  imports: [
    CommonModule,
    RegisterUserRoutingModule,
    sharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegisterUserModule { }
