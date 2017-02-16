import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { InMemoryWebApiModule, InMemoryBackendService } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './routing.module';
import { HeaderModule } from './header/header.module';
import { EntryModule } from './entry/entry.module';
import { ReviewModule } from './review/review.module';
import { ContentfulService } from './services/contentful.service';

import { AppComponent } from './app.component';
import { LandingModule } from './landing/landing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HeaderModule,
    AppRoutingModule,
    LandingModule,
    EntryModule,
    ReviewModule
  ],
  providers: [
    ContentfulService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
