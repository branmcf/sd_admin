import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserService } from './../services/user.service';
import { AdminService } from './../services/admin.service';

import { ReviewLandingComponent } from './reviewLanding/reviewLanding.component';
import { ReviewResourcesComponent } from './reviewResources/reviewResources.component';
import { ReviewEventsComponent } from './reviewEvents/reviewEvents.component';
import { ReviewCongregationsComponent } from './reviewCongregations/reviewCongregations.component';
import { ReviewPersonsComponent } from './reviewPersons/reviewPersons.component';
import { ReviewOrganizationsComponent } from './reviewOrganizations/reviewOrganizations.component';

import { EditResourcesComponent } from './../edit/editResources/editResources.component';

const routes: Routes = [
    { path: '', component: ReviewLandingComponent, canActivate: [AdminService]},
    { path: 'resources', component: ReviewResourcesComponent, canActivate: [AdminService] },
    { path: 'person', component: ReviewPersonsComponent, canActivate: [AdminService] },
    { path: 'events', component: ReviewEventsComponent, canActivate: [AdminService] },
    { path: 'organizations', component: ReviewOrganizationsComponent, canActivate: [AdminService] },
    { path: 'congregations', component: ReviewCongregationsComponent, canActivate: [AdminService] },
    { path: 'resources/:id', component: EditResourcesComponent, canActivate: [AdminService] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ReviewRoutingModule { }
