import { NgModule } from '@angular/core';
import { MapDataPipe } from './mapper.pipe';

@NgModule({
    imports: [],
    declarations: [MapDataPipe],
    exports:[MapDataPipe],
    providers: []
})
export class MapperPipeModule {}