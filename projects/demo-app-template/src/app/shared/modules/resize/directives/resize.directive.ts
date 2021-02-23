import {Directive, Inject} from '@angular/core';
import { CustomUnsubscribeService } from '@demo-app/shared/services/unsubscribe.service';
import {Observable} from 'rxjs';
import { ResizeService } from '../services/resize.service';

@Directive({
    selector: '[resizeWatcher]',
    outputs: ['resizeWatcher'],
    providers: [CustomUnsubscribeService, ResizeService],
})
export class ResizeDirective {
    constructor(
        @Inject(ResizeService)
        readonly resizeWatcher: Observable<ReadonlyArray<ResizeObserverEntry>>,
    ) {}
}
