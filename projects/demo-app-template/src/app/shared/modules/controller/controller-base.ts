import { OnChanges, InjectionToken, Provider, Optional, ChangeDetectorRef } from "@angular/core";
import { Subject } from "rxjs";
import {  } from "./demo-controller.directive";

/** Base class for all controller directives / components to extend */
export abstract class Controller implements OnChanges {
    readonly change$ = new Subject<void>();

    ngOnChanges() {
        this.change$.next();
    }
}

export const DEMO_CONTROLLER = new InjectionToken('Demo controller');

