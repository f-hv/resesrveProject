import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReserveComponent } from '../admin/reserve/reserve.component';
import { ClientComponent } from './client.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile'
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module')
          .then(m => m.ProfileModule)
      },
      // {
      //   path: 'reserved',
      //   loadChildren: () => import('./reserved/reserved.module')
      //     .then(m => m.ReservedModule)
      // },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
