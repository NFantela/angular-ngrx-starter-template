import { Directive } from "@angular/core";

@Directive({
    selector: 'demo-badge, [demo-badge]',
    host : {
        'class' : 'demo-badge'
    }
})export class DemoBadgeDirective {

}