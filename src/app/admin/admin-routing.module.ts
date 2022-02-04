import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'admin',
      // },
      {
        path: 'city',
        loadChildren: () => import('./city/city.module')
          .then(m => m.CityModule)
      },
      {
        path: 'flight',
        loadChildren: () => import('./flight/flight.module')
          .then(m => m.FlightModule)
      },
      {
        path: 'airline',
        loadChildren: () => import('./airline/airline.module')
          .then(m => m.AirlineModule)
      },
      {
        path:'reserve',
        loadChildren:()=> import ('./reserve/reserve.module')
        .then (m => m.ReserveModule)
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
