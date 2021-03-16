import { ChangeDetectorRef, Directive, ElementRef, forwardRef, Inject, Provider, SkipSelf } from "@angular/core";
import { CustomUnsubscribeService } from "@demo-app/shared/services/unsubscribe.service";
import { Observable } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";
import { Controller, DiTableDirective } from "./di-table.directive";

export function watchedControllerFactory(
    controller: Controller,
    changeDetectorRef: ChangeDetectorRef,
    destroy$: Observable<void>,
): Controller {
    controller.change$.pipe( takeUntil(destroy$)).subscribe();

    return controller;
}

const DI_TABLE_HEAD_PROVIDERS: Provider[] = [
    CustomUnsubscribeService, // provide it here for component
    {
        /** provide parent table directive with automatic subscribe */
        provide: DiTableDirective,
        deps: [[new SkipSelf(), DiTableDirective], ChangeDetectorRef, CustomUnsubscribeService],
        useFactory: watchedControllerFactory
    }
];

@Directive({
    selector: '[thead[diThead]]',
    providers: DI_TABLE_HEAD_PROVIDERS
}) export class DiHeadDirective {

    constructor(
        @Inject(forwardRef(() => DiTableDirective))
        readonly table: DiTableDirective,
        @Inject(ElementRef) private readonly elRef : ElementRef
    ) { 

        elRef.nativeElement.innerHTML = table.diTableHeader;
    }

}