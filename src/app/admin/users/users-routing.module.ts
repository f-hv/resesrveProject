import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { UsersComponent } from './users.component';

const routes: Routes = [

  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path:'',
        redirectTo:'list'
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'update/:id',
        component:UpdateComponent
      },
      {
        path: 'create',
        component:CreateComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
