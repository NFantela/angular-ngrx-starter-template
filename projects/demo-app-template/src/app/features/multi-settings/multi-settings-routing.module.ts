import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage-users',
    pathMatch: 'full'
  },
  { path: 'manage-users', 
    loadChildren: () => import('./manage-users/manage-users.module').then(m => m.ManageUsersModule) 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultiSettingsRoutingModule { }
