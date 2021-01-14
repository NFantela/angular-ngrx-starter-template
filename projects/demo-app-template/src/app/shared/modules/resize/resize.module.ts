import { NgModule } from '@angular/core';
import { ResizeDirective } from './directives/resize.directive';

@NgModule({
    imports: [],
    declarations: [ResizeDirective],
    exports:[ResizeDirective],
    providers: []
})
export class ResizeModule {}