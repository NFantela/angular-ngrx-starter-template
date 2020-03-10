import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUsersComponent } from './containers/users/users.component';
import { ManageUsersRoutingModule } from './manage-users.routing.module';


@NgModule({
  declarations: [ManageUsersComponent],
  imports: [
    CommonModule,
    ManageUsersRoutingModule
  ]
})
export class ManageUsersModule { }
