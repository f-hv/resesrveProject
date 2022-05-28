import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from '../admin/city/create/create.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { ReserveComponent } from './reserve.component';

const routes: Routes = [
  {
    path: '',
    component: ReserveComponent,
    children: [
      {
        path: 'list/:source/:destination/:passenger',
        component: ListComponent
      },
      {
        path:'form',
        component:FormComponent
      },
      {
        path: '',
        redirectTo:'form'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReserveRoutingModule { }
