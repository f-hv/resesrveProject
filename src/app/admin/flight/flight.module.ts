import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightRoutingModule } from './flight-routing.module';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NbDatepickerDirective, NbDatepickerModule, NbInputModule } from '@nebular/theme';
import { sharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CreateComponent,
    UpdateComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    FlightRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    NbDatepickerModule,
    NbInputModule, 
    sharedModule
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
})
export class FlightModule { }
