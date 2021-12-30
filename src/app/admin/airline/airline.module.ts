import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AirlineRoutingModule } from './airline-routing.module';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { sharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FormComponent,
    ListComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    AirlineRoutingModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    FormsModule,
    sharedModule
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class AirlineModule { }
