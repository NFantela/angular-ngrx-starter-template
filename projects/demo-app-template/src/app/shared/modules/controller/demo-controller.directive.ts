import { ChangeDetectorRef, Directive, Input, Optional, Provider } from "@angular/core";
import { Observable } from "rxjs";
import { Controller, DEMO_CONTROLLER } from "./controller-base";
import { CustomUnsubscribeService} from '../../services/unsubscribe.service';
import { takeUntil} from 'rxjs/operators';
/**
 * Usage  - so attach this directive to an el and deeply
 * nested element can inject it using 
      @Component({
         //...
         providers: [DEMO_CONTROLLER_PROVIDERS,],
      })
      export class SomeComponentUsingController {
         constructor(
            //...
            @Inject(DEMO_CONTROLLER)
            readonly contentController: DemoControllerDirective,
         ) {}
      }
 */
@Directive({
    selector: '[demoCntrlDirective]'
 })
 export class DemoControllerDirective extends Controller{
    @Input()
    content: string = '';
  
    constructor(){
        super();
    }
 }


 export function hintWatchedControllerFactory(
    controller: DemoControllerDirective | null,
    changeDetectorRef: ChangeDetectorRef,
    destroy$: Observable<void>,
 ): Controller {
   if (!controller) {
      return new DemoControllerDirective();
   }
  
    controller.change$.pipe(takeUntil(destroy$)).subscribe(() => {
       changeDetectorRef.markForCheck();
    });
  
    return controller;
 }
 
 export const DEMO_CONTROLLER_PROVIDERS: Provider = [
    CustomUnsubscribeService,
   {
       provide: DEMO_CONTROLLER,
       deps: [[new Optional(), DemoControllerDirective], ChangeDetectorRef, CustomUnsubscribeService ],
       useFactory: hintWatchedControllerFactory,
   },
];
