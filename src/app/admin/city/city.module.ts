import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { sharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    FormComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    sharedModule,
    NgbModule
  ],
  schemas:[NO_ERRORS_SCHEMA , CUSTOM_ELEMENTS_SCHEMA]
})
export class CityModule { }
