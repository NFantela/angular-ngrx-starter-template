

import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
/** Always provide this class in component / directive to make sure that ngOnDestroy follows its host
 * To be used with takeUntil() in streams
 */
export class CustomUnsubscribeService extends Observable<void> implements OnDestroy {

    private readonly _life$ = new ReplaySubject<void>(1);

    /** Upon creating this class we register a fn that will pass all subscribers of this class to our subject
     * e.g. whenevery this observable service class is used in stream with takeUntil a new 
     * subscriber will be added to subject 
     */
    constructor() {
        super(subscriber => this._life$.subscribe(subscriber) );
    }
    
    ngOnDestroy(){
        this._life$.next();
        this._life$.complete();
    }
}