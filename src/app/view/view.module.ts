import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { HeaderModule } from '../header/header.module';
import { ViewRoutingModule } from './view-routing.module';

import { ViewComponent } from './view/view.component';

@NgModule({
  id: 'view',
  imports: [
    CommonModule,
    HttpModule,
    HeaderModule,
    MaterialModule.forRoot(),
  ],
  declarations: [
    ViewComponent
  ],
  exports: [
    ViewRoutingModule
  ]
})
export class ViewModule { }
