import { NgModule, ErrorHandler } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AppErrorHandler } from './services/error-handler/app-error-handler.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/http-interceptors/http-error.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        CommonModule,
        // material
        MatSnackBarModule,
    ],
    declarations: [],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    ]
})
export class CoreModule {}