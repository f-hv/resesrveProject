import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/guard/auth.guard';
import { UserRoleEnum } from './shared/enums/user-role.enum';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { roles: [UserRoleEnum.ADMIN] }
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module')
      .then(m => m.ClientModule),
    canActivate: [AuthGuard],
    data: { roles: [UserRoleEnum.USER] }
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
    path: 'reserve',
    loadChildren: () => import('./reserve/reserve.module')
      .then(m => m.ReserveModule),
  },
  {
    path: 'accessDenied',
    loadChildren: () => import('./access-denied/access-denied.module')
      .then(m => m.AccessDeniedModule)
  },
  // {
  //   path: '',
  //   redirectTo: 'reserve',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
