import { NgModule } from '@angular/core';

import { MultiSettingsRoutingModule } from './multi-settings-routing.module';
import { UsersService } from './services/users/users.service';
//ngrx
import { FEATURE_NAME, reducers } from './multi-settings-store/multi-settings.state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MultiSettingsUsersEffects } from './multi-settings-store/effects/users/users.effect';


@NgModule({
  declarations: [],
  imports: [
    MultiSettingsRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([
      MultiSettingsUsersEffects
    ])
  ],
  providers:[
    UsersService
  ]
})
export class MultiSettingsModule { }
