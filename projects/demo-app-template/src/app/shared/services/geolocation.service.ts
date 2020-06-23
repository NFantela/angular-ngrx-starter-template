import { InjectionToken, inject, Injectable, Inject } from '@angular/core';
import { NAVIGATOR } from '@ng-web-apis/common';
import { Observable } from 'rxjs';
import { finalize, shareReplay } from 'rxjs/operators';

// we need additional @ng-web-apis/common package for NAVIGATOR
// declare TOKENS 
export const GEOLOCATION = new InjectionToken<Geolocation>(
    'An abstraction over window.navigator.geolocation object',
    {
        factory: () => inject(NAVIGATOR).geolocation,
    },
);
// check geolocation support
export const GEOLOCATION_SUPPORT = new InjectionToken<boolean>(
    'Is Geolocation API supported?',
    {
        factory: () => !!inject(GEOLOCATION),
    },
);
// inject position options
export const POSITION_OPTIONS = new InjectionToken<PositionOptions>(
    'Token for an additional position options',
    { factory: () => ({}) },
);

/**
 *  declare our service as class extending Observable
 *  can be used as any observable in class with .subscribe or in template :
 *  [position]="position$ | async"
 * */
@Injectable({
    providedIn: 'root',
})
export class GeolocationService extends Observable<Position> {

    constructor(
        @Inject(GEOLOCATION) geolocationRef: Geolocation,
        @Inject(GEOLOCATION_SUPPORT) geolocationSupported: boolean,
        @Inject(POSITION_OPTIONS) positionOptions: PositionOptions) {

        let watchPositionId = 0;

        super(subscriber => {
            if (!geolocationSupported) {
                subscriber.error('Geolocation is not supported in your browser');
            }
            // assign to our variable 
            watchPositionId = geolocationRef.watchPosition(
                position => subscriber.next(position),
                positionError => subscriber.error(positionError),
                positionOptions,
            );
        });
        // unsubscribe / teardown logic
        return this.pipe(
            finalize(() => geolocationRef.clearWatch(watchPositionId)),
            shareReplay({ bufferSize: 1, refCount: true }),
        );
    }
}