import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUsersComponent } from './containers/users/users.component';
import { ManageUsersRoutingModule } from './manage-users.routing.module';
import { DemoBadgeModule } from '@demo-app/shared/demo-badge-module/demo-badge.module';


@NgModule({
  declarations: [ManageUsersComponent],
  imports: [
    CommonModule,
    ManageUsersRoutingModule,
    DemoBadgeModule
  ]
})
export class ManageUsersModule { }
