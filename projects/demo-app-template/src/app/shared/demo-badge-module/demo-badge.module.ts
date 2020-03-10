import { NgModule } from '@angular/core';
import { DemoBadgeDirective } from './directives/demo-badge.directive';

@NgModule({
    imports: [],
    declarations: [DemoBadgeDirective],
    exports:[DemoBadgeDirective],
    providers: []
})
export class DemoBadgeModule {}