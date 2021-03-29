import { NgModule } from '@angular/core';
import { DemoControllerDirective } from './demo-controller.directive';

@NgModule({
    imports: [],
    declarations: [DemoControllerDirective],
    exports:[DemoControllerDirective],
    providers: []
})
export class DemoControllerModule {}