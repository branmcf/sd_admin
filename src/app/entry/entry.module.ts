import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { EntryComponent } from './entryLogin/entryLogin.component';
import { EntryResourcesComponent, ResourceDialog } from './entryResources/entryResources.component';
import { EntryPersonComponent, PersonDialog } from './entryPerson/entryPerson.component';
import { EntryCongregationComponent , CongDialog } from './entryCongregation/entryCongregation.component';
import { EntryOrgsComponent, OrgsDialog } from './entryOrgs/entryOrgs.component';
import { EntryEventComponent, EventDialog } from './entryEvent/entryEvent.component';
import { EntryRegisterComponent } from './entryRegister/entryRegister.component';
import { EntryLandingComponent } from './entryLanding/entryLanding.component';
import { HeaderModule } from '../header/header.module';
import { SharedModule } from './../shared/shared.module';
import { EntryRoutingModule } from './entry-routing.module';

import { ReviewLandingComponent } from './../review/reviewLanding/reviewLanding.component';
import { ReviewResourcesComponent } from './../review/reviewResources/reviewResources.component';

import { SubmitService } from '../services/submit.service';
import { ContentfulService } from '../services/contentful.service';
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';
import { ReviewService } from '../services/review.service';

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
    CongDialog,
    PersonDialog,
    ResourceDialog,
    EventDialog,
    OrgsDialog,
    EntryRegisterComponent,
    ReviewLandingComponent,
    ReviewResourcesComponent,
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
    AdminService,
    ReviewService,
  ],
  exports: [
    EntryRoutingModule
  ]
})

export class EntryModule {
}
