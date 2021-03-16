import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './containers/home/home.component';

import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { DiHeadDirective } from './containers/home/di-table/di-table-head.directive';
import { DiTableDirective } from './containers/home/di-table/di-table.directive';


@NgModule({
  declarations: [HomeComponent, DiTableDirective, DiHeadDirective],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatMenuModule
  ]
})
export class HomeModule { }
