import {DOCUMENT} from '@angular/common';
import {Inject, Injectable, NgZone} from '@angular/core';
import {merge, Observable} from 'rxjs';
import {
    distinctUntilChanged,
    filter,
    mapTo,
    startWith,
    switchMap,
    take,
} from 'rxjs/operators';
import { zoneOptimized } from '../custom-rxjs-operators/zone-free';
import { typedFromEvent } from '../utils/type_utils';

// @dynamic
@Injectable({
    providedIn: 'root',
})
export class HoveredService {
    private readonly documentEvents$: Observable<Event>;

    constructor(
        @Inject(DOCUMENT) documentRef: Document,
        @Inject(NgZone) private readonly ngZone: NgZone,
    ) {
        this.documentEvents$ = merge(
            typedFromEvent(documentRef, 'mousemove'),
            typedFromEvent(documentRef, 'touchend'),
        );
    }

    createHovered$(
        target: Element,
        options: AddEventListenerOptions = {},
    ): Observable<boolean> {
        return typedFromEvent(target, 'mouseenter', options).pipe(
            switchMap(() =>
                merge(
                    typedFromEvent(target, 'mouseleave', options),
                    this.documentEvents$.pipe(
                        filter(event => !target.contains(getTarget(event))),
                        zoneOptimized(this.ngZone),
                        take(1),
                    ),
                ).pipe(mapTo(false), startWith(true)),
            ),
            distinctUntilChanged(),
        );
    }
}
