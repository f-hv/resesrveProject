import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path:'airline',
  //   loadChildren:()=> import ('./')
  //   .then (m => m.)

  // },
  {
    path:'',
    redirectTo:'airline',
  },
  {
    path:'city',
    loadChildren:()=> import ('./city/city.module')
    .then (m => m.CityModule)
  },
  {
    path:'flight',
    loadChildren:()=> import ('./flight/flight.module')
    .then (m => m.FlightModule)
  },
  {
    path:'airline',
    loadChildren:()=> import ('./airline/airline.module')
    .then (m => m.AirlineModule)
  },
  // {
  //   path:'reserve',
  //   loadChildren:()=> import ('./')
  //   .then (m => m.)

  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
