import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { EntryComponent } from './entryLogin/entryLogin.component';
import { EntryResourcesComponent } from './entryResources/entryResources.component';
import { EntryPersonComponent } from './entryPerson/entryPerson.component';
import { EntryCongregationComponent , CongDialog } from './entryCongregation/entryCongregation.component';
import { EntryOrgsComponent } from './entryOrgs/entryOrgs.component';
import { EntryEventComponent } from './entryEvent/entryEvent.component';
import { EntryReviewComponent } from './entryReview/entryReview.component';
import { EntryLandingComponent } from './entryLanding/entryLanding.component';
import { HeaderModule } from '../header/header.module';
import { SharedModule } from './../shared/shared.module';
import { EntryRoutingModule } from './entry-routing.module';

import { SubmitService } from '../services/submit.service';
import { ContentfulService } from '../services/contentful.service';
import { UserService } from '../services/user.service';

@NgModule({
  id: 'entry',
  declarations: [
    EntryResourcesComponent,
    EntryComponent,
    EntryLandingComponent,
    EntryPersonComponent,
    EntryCongregationComponent,
    EntryOrgsComponent,
    EntryEventComponent,
    EntryReviewComponent,
    CongDialog,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    HeaderModule,
    SharedModule,
    MaterialModule.forRoot(),
    EntryRoutingModule
  ],
  providers: [
    SubmitService,
    ContentfulService,
    UserService,
  ],
  exports: [
    EntryRoutingModule
  ]
})

export class EntryModule {
}
