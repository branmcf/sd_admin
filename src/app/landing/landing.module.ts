import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { TitleComponent } from './title/title.component';
import { HeaderModule } from '../header/header.module';
import { LandingRoutingModule } from './landing-routing.module';
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    LandingComponent,
    TitleComponent
  ],
  exports: [
    LandingRoutingModule
  ]
})
export class LandingModule { }
