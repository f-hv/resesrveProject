import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReserveRoutingModule } from './reserve-routing.module';
import { ListComponent } from './list/list.component';
import { sharedModule } from 'src/app/shared/shared.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ReserveRoutingModule,
    sharedModule,
    NgbPaginationModule
  ]
})
export class ReserveModule { }
