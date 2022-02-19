import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
      },
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
      },
      {
        path:'register',
        loadChildren:()=> import ('../register-user/register-user.module')
        .then (m => m.RegisterUserModule)
      },
      {
        path:'dashboard',
        loadChildren:()=> import ('./dashboard/dashboard.module')
        .then (m => m.DashboardModule)
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
