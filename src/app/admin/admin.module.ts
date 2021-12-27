import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CityComponent } from './city/city.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightComponent } from './flight/flight.component';
import { AirlineComponent } from './airline/airline.component';
import { NbDatepickerModule } from '@nebular/theme';


@NgModule({
  declarations: [CityComponent, FlightComponent, AirlineComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule.forRoot()
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class AdminModule { }
