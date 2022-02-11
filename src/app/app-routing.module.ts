import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/guard/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
    .then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    }
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module')
    .then(m => m.ClientModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module')
    .then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register-user/register-user.module')
    .then(m => m.RegisterUserModule)
  },
  {
    path:'',
    redirectTo:'register',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
