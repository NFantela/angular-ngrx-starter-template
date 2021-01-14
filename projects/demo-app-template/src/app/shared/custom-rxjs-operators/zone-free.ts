import {NgZone} from '@angular/core';
import {
    MonoTypeOperatorFunction,
    Observable,
    Observer,
    Operator,
    pipe,
    TeardownLogic,
} from 'rxjs';

class ZonefreeOperator<T> implements Operator<T, T> {
    constructor(private readonly ngZone: NgZone) {}

    call(observer: Observer<T>, source: Observable<T>): TeardownLogic {
        return this.ngZone.runOutsideAngular(() => source.subscribe(observer));
    }
}

export function zonefull<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
    return source =>
        new Observable(subscriber =>
            source.subscribe({
                next: value => ngZone.run(() => subscriber.next(value)),
                error: error => ngZone.run(() => subscriber.error(error)),
                complete: () => ngZone.run(() => subscriber.complete()),
            }),
        );
}

export function zonefree<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
    return source => source.lift(new ZonefreeOperator<T>(ngZone));
}

export function zoneOptimized<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
    return pipe(zonefree(ngZone), zonefull(ngZone));
}
