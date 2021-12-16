import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path:'',
    component:CityComponent,
    children:[
      {
        path:'create',
        component:CreateComponent
      },
      {
        path:'update/:id',
        component:EditComponent
      },
      {
        path:'list',
        component:ListComponent
      },
      {
        path: '',
        redirectTo: 'list'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
