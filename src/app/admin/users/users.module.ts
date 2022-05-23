import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';
import { sharedModule } from 'src/app/shared/shared.module';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { RegisterUserModule } from 'src/app/register-user/register-user.module';


@NgModule({
  declarations: [
    ListComponent,
    UpdateComponent,
    CreateComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    sharedModule,
    RegisterUserModule
  ],
  schemas:[NO_ERRORS_SCHEMA ,CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule { }
