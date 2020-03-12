import { NgModule, ErrorHandler } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AppErrorHandler } from './services/error-handler/app-error-handler.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/http-interceptors/http-error.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// ngrx
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './core-store/core.state';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { SettingsEffects } from './core-store/effects/settings/settings.effects';
import { GoogleAnalyticsEffects } from './core-store/effects/analytics/google-analytics.effects';
import { environment } from '../../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
    imports: [
        CommonModule,
        // material
        MatSnackBarModule,

        // ngrx
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([
            SettingsEffects,
            GoogleAnalyticsEffects
        ]),
        environment.production ? []
            : StoreDevtoolsModule.instrument({
                name: 'Angular NgRx Material Starter'
                }),
    ],
    declarations: [],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    ]
})
export class CoreModule {}