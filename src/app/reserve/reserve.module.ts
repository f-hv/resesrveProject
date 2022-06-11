import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveRoutingModule } from './reserve-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { sharedModule } from '../shared/shared.module';
import { FormComponent } from './form/form.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ReserveComponent } from './reserve.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';

@NgModule({
  declarations: [
    ReserveComponent,
    FormComponent,
    CreateComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    ReserveRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    NgbModule,
    sharedModule,
    NgPersianDatepickerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ReserveModule {}
