import { NgModule } from '@angular/core';
import { AutoFocusDirective } from './directives/autofocus.directive';

@NgModule({
    imports: [],
    declarations: [AutoFocusDirective],
    exports:[AutoFocusDirective],
    providers: []
})
export class AutoFocusModule {}