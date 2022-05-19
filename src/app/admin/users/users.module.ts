import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';
import { sharedModule } from 'src/app/shared/shared.module';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    ListComponent,
    UpdateComponent,
    CreateComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    sharedModule
  ]
})
export class UsersModule { }
