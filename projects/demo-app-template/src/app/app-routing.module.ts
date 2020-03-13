import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';


const routes: Routes = [
  {
    path: '',
    redirectTo: environment.navRoutes.home,
    pathMatch: 'full'
  },
  { path: environment.navRoutes.home, 
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) 
  },
  { path: environment.navRoutes.multiSettings, 
    loadChildren: () => import('./features/multi-settings/multi-settings.module').then(m => m.MultiSettingsModule) 
  },
  {
    path: '**',
    redirectTo: environment.navRoutes.home
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
