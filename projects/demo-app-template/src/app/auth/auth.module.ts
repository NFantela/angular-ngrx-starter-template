import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { AUTH_FEATURE_NAME, reducers } from './auth-store/auth-state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth-store/effects/auth-effects';

@NgModule({
  declarations: [],
  imports: [
    AuthRoutingModule,
    StoreModule.forFeature(AUTH_FEATURE_NAME, reducers),
    EffectsModule.forFeature([
      AuthEffects
    ])
  ]
})
export class AuthModule { }