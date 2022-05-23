import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientComponent } from './client.component';
import { ProfileComponent } from './profile/profile.component';
import { ReservedComponent } from './reserved/reserved.component';
import { sharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ClientComponent,
    ProfileComponent,
    ReservedComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    sharedModule,
    FormsModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class ClientModule { }
