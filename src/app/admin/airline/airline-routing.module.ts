import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirlineComponent } from './airline.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path:'',
    component:AirlineComponent,
    children:[{
      path:'',
      redirectTo:'list'
    },
    {
      path:'list',
      component:ListComponent
    },
    {
      path:'create',
      component:CreateComponent
    },
    {
      path:'update/:id',
      component:UpdateComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirlineRoutingModule { }
