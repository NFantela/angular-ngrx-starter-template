import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUsersComponent } from './containers/users/users.component';
import { ManageUsersRoutingModule } from './manage-users.routing.module';
import { DemoBadgeModule } from '@demo-app/shared/demo-badge-module/demo-badge.module';

import { LazyIconsRegistryService} from '../../../shared/lazy-svg-icons/lazy-icons.registry.service';
import { dinoCryingIcon } from '@demo-app/shared/lazy-svg-icons/lazy-icons';
import { LazyIconsModule }  from '../../../shared/lazy-svg-icons/lazy-icons.module';
import { LoaderModuleModule } from '@demo-app/shared/loader/loader.module';
import { ResizeModule } from '@demo-app/shared/modules/resize/resize.module';
import { MatServerSortAndPaginationModule } from '@demo-app/shared/modules/material-server-sort-pagination/material-server-sort-pagination.module';

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SingleUserComponent } from './components/single-user/single-user.component';
import { AutoFocusModule } from '@demo-app/shared/modules/autofocus/autofocus.module';


@NgModule({
  declarations: [ManageUsersComponent, SingleUserComponent],
  imports: [
    CommonModule,
    ManageUsersRoutingModule,
    DemoBadgeModule,
    LazyIconsModule,
    LoaderModuleModule,
    ResizeModule,
    AutoFocusModule,
    MatServerSortAndPaginationModule,
    MatTableModule,MatSortModule,MatPaginatorModule
  ]
})
export class ManageUsersModule { 
  // add icon to register
  constructor(@Inject(LazyIconsRegistryService) private lazyIconsRegistry:LazyIconsRegistryService){
    lazyIconsRegistry.registerIcons([dinoCryingIcon])
 }
}
