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
import { ViewAllResourcesComponent } from './view-all-resources/view-all-resources.component';

import { EditResourcesComponent, ResourceDialog } from './../edit/editResources/editResources.component';
import { EditPersonComponent, PersonDialog } from './../edit/editPerson/editPerson.component';
import { EditEventsComponent, EventDialog } from './../edit/editEvents/editEvents.component';
import { EditOrganizationsComponent, OrgDialog } from './../edit/editOrganizations/editOrganizations.component';
import { EditCongregationsComponent, CongDialog } from './../edit/editCongregations/editCongregations.component';


const routes: Routes = [
    { path: '', component: ReviewLandingComponent, canActivate: [AdminService]},
    { path: 'resources', component: ReviewResourcesComponent, canActivate: [AdminService] },
    { path: 'allResources', component: ViewAllResourcesComponent, canActivate: [AdminService] },
    { path: 'allResources/:id', component: EditResourcesComponent, canActivate: [AdminService] },
    { path: 'allResources/:id', component: ResourceDialog },
    { path: 'person', component: ReviewPersonsComponent, canActivate: [AdminService] },
    { path: 'events', component: ReviewEventsComponent, canActivate: [AdminService] },
    { path: 'organizations', component: ReviewOrganizationsComponent, canActivate: [AdminService] },
    { path: 'congregations', component: ReviewCongregationsComponent, canActivate: [AdminService] },
    { path: 'resources/:id', component: EditResourcesComponent, canActivate: [AdminService] },
    { path: 'resources/:id', component: ResourceDialog },
    { path: 'person/:id', component: EditPersonComponent, canActivate: [AdminService] },
    { path: 'person/:id', component: PersonDialog },
    { path: 'events/:id', component: EditEventsComponent, canActivate: [AdminService] },
    { path: 'events/:id', component: EventDialog },
    { path: 'organizations/:id', component: EditOrganizationsComponent, canActivate: [AdminService] },
    { path: 'organizations/:id', component: OrgDialog },
    { path: 'congregations/:id', component: EditCongregationsComponent, canActivate: [AdminService] },
    { path: 'congregations/:id', component: CongDialog },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ReviewRoutingModule { }
