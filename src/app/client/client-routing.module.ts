import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterUserComponent } from '../register-user/register-user.component';


const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   loadChildren: () => import('../login/login.module')
  //     .then(m => m.LoginModule)
  // },
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
