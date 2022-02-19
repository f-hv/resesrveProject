import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { ClientComponent } from './client.component';


const routes: Routes = [
  {
    path: '',
    component:ClientComponent,
  }
  // {
  //   path: 'register',
  //   component: RegisterUserComponent,
  //   loadChildren:()=> import('../register-user/register-user.module')
  //   .then(m => m.RegisterUserModule)
  // },
  // {
  //   path:'',
  //   redirectTo:'login',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
