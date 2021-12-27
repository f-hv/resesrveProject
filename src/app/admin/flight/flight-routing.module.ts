import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from '../city/city.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path:'',
    component:CityComponent,
    children:[
      {
        path:'list',
        component:ListComponent
      },
      {
        path:'update/:id',
        component:UpdateComponent
      },
      {
        path:'create',
        component:CreateComponent
      },
      {
        path:'',
        redirectTo:'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
