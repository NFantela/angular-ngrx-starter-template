import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../auth/guards/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage-users',
    pathMatch: 'full'
  },
  { path: 'manage-users', 
    loadChildren: () => import('./manage-users/manage-users.module').then(m => m.ManageUsersModule),
    canActivate:[AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultiSettingsRoutingModule { }
