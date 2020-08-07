

import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
/** Always provide this class in component / directive to make sure that ngOnDestroy follows its host
 * To be used with takeUntil() in streams
 */
export class CustomUnsubscribeService extends Subject<void> implements OnDestroy {
    ngOnDestroy() {
        this.next();
        this.complete();
    }
}