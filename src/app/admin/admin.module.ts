import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightComponent } from './flight/flight.component';
import { AirlineComponent } from './airline/airline.component';
import { AdminComponent } from './admin.component';
import { ReserveComponent } from './reserve/reserve.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { sharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    FlightComponent,
    AirlineComponent,
    AdminComponent,
    ReserveComponent,
    DashboardComponent,
    UsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    sharedModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AdminModule { }
