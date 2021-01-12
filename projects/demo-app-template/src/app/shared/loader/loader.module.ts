import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './containers/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    imports: [CommonModule, MatProgressSpinnerModule],
    declarations: [LoaderComponent],
    exports:[LoaderComponent],
    providers: []
})
export class LoaderModuleModule {}