import {ElementRef, Inject, Injectable, NgZone} from '@angular/core';
import { zonefree } from '@demo-app/shared/custom-rxjs-operators/zone-free';
import { CustomUnsubscribeService } from '@demo-app/shared/services/unsubscribe.service';
import {
    RESIZE_OBSERVER_SUPPORT,
    RESIZE_OPTION_BOX,
    ResizeObserverService,
} from '@ng-web-apis/resize-observer';
import {interval, Observable} from 'rxjs';
import {
    catchError,
    debounceTime,
    distinctUntilChanged,
    map,
    mapTo,
    takeUntil,
} from 'rxjs/operators';

// @dynamic
@Injectable()
export class ResizeService extends ResizeObserverService {
    constructor(
        @Inject(ElementRef) elementRef: ElementRef<HTMLElement>,
        @Inject(NgZone) ngZone: NgZone,
        @Inject(CustomUnsubscribeService) destroy$: Observable<void>,
        @Inject(RESIZE_OBSERVER_SUPPORT) support: boolean,
        @Inject(RESIZE_OPTION_BOX) box: ResizeObserverOptions['box'],
    ) {
        super(elementRef, ngZone, support, box);
        // if it errors it retries
        return this.pipe(
            catchError(() =>
                interval(1000 / 15).pipe(
                    map(
                        () =>
                            `${elementRef.nativeElement.clientWidth} ${elementRef.nativeElement.clientHeight}`,
                    ),
                    distinctUntilChanged(),
                    mapTo([]),
                ),
            ),
            takeUntil(destroy$),
            debounceTime(0),
            zonefree(ngZone),
        );
    }
}
