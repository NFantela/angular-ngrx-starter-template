import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUsersComponent } from './containers/users/users.component';
import { ManageUsersRoutingModule } from './manage-users.routing.module';
import { DemoBadgeModule } from '@demo-app/shared/demo-badge-module/demo-badge.module';

import { LazyIconsRegistryService} from '../../../shared/lazy-svg-icons/lazy-icons.registry.service';
import { dinoCryingIcon } from '@demo-app/shared/lazy-svg-icons/lazy-icons';
import { LazyIconsModule }  from '../../../shared/lazy-svg-icons/lazy-icons.module';
import { LoaderModuleModule } from '@demo-app/shared/loader/loader.module';

@NgModule({
  declarations: [ManageUsersComponent],
  imports: [
    CommonModule,
    ManageUsersRoutingModule,
    DemoBadgeModule,
    LazyIconsModule,
    LoaderModuleModule
  ]
})
export class ManageUsersModule { 
  // add icon to register
  constructor(@Inject(LazyIconsRegistryService) private lazyIconsRegistry:LazyIconsRegistryService){
    lazyIconsRegistry.registerIcons([dinoCryingIcon])
 }
}
