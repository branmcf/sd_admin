import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { HeaderModule } from '../header/header.module';
import { SharedModule } from './../shared/shared.module';
import { ReviewRoutingModule } from './review-routing.module';

import { ReviewLandingComponent } from './../review/reviewLanding/reviewLanding.component';
import { ReviewResourcesComponent } from './../review/reviewResources/reviewResources.component';
import { ReviewEventsComponent } from './reviewEvents/reviewEvents.component';
import { ReviewCongregationsComponent } from './reviewCongregations/reviewCongregations.component';
import { ReviewPersonsComponent } from './reviewPersons/reviewPersons.component';
import { ReviewOrganizationsComponent } from './reviewOrganizations/reviewOrganizations.component';

import { EditResourcesComponent, ResourceDialog } from './../edit/editResources/editResources.component';
import { EditPersonComponent, PersonDialog } from './../edit/editPerson/editPerson.component';
import { EditEventsComponent } from './../edit/editEvents/editEvents.component';
import { EditOrganizationsComponent } from './../edit/editOrganizations/editOrganizations.component';
import { EditCongregationsComponent } from './../edit/editCongregations/editCongregations.component';

import { SubmitService } from '../services/submit.service';
import { ContentfulService } from '../services/contentful.service';
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';
import { ReviewService } from '../services/review.service';

@NgModule({
  id: 'review',
  declarations: [
    ReviewLandingComponent,
    ReviewResourcesComponent,
    ReviewCongregationsComponent,
    ReviewEventsComponent,
    ReviewPersonsComponent,
    ReviewOrganizationsComponent,
    EditResourcesComponent,
    EditEventsComponent,
    EditCongregationsComponent,
    EditOrganizationsComponent,
    EditPersonComponent,
    ResourceDialog,
    PersonDialog,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    HeaderModule,
    SharedModule,
    MaterialModule.forRoot(),
    ReviewRoutingModule,
  ],
  providers: [
    SubmitService,
    ContentfulService,
    UserService,
    AdminService,
    ReviewService,
  ],
  exports: [
    ReviewRoutingModule
  ]
})

export class ReviewModule {
}
