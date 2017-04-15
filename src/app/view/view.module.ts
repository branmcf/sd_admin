import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { HeaderModule } from '../header/header.module';
import { ViewRoutingModule } from './view-routing.module';
import { FormsModule } from '@angular/forms';

import { ViewComponent } from './view/view.component';
import { ViewResourcesComponent } from './viewResources/viewResources.component';


@NgModule({
  id: 'view',
  imports: [
    RouterModule,
    CommonModule,
    HttpModule,
    HeaderModule,
    FormsModule,
    MaterialModule.forRoot(),
  ],
  declarations: [
    ViewComponent,
    ViewResourcesComponent
  ],
  exports: [
    ViewRoutingModule
  ]
})
export class ViewModule { }
