import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', 
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) 
  },
  { path: 'multi-settings', 
    loadChildren: () => import('./features/multi-settings/multi-settings.module').then(m => m.MultiSettingsModule) 
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
