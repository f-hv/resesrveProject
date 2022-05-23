import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservedComponent } from './reserved.component';

const routes: Routes = [
  {
    path:'',
    component:ReservedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservedRoutingModule { }
