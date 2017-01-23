import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { EntryComponent } from './entryLogin/entryLogin.component';
import { EntryResourcesComponent } from './entryResources/entryResources.component';
import { EntryPersonComponent } from './entryPerson/entryPerson.component';
import { EntryCongregationComponent } from './entryCongregation/entryCongregation.component';
import { EntryOrgsComponent } from './entryOrgs/entryOrgs.component';
import { EntryEventComponent } from './entryEvent/entryEvent.component';
import { EntryReviewComponent } from './entryReview/entryReview.component';
import { EntryLandingComponent } from './entryLanding/entryLanding.component';

const routes: Routes = [
    { path: '', component: EntryComponent} ,
    { path: 'welcome', component: EntryLandingComponent },
    { path: 'resources', component: EntryResourcesComponent },
    { path: 'person', component: EntryPersonComponent },
    { path: 'congregations', component: EntryCongregationComponent },
    { path: 'orgs', component: EntryOrgsComponent },
    { path: 'events', component: EntryEventComponent },
    { path: 'review', component: EntryReviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EntryRoutingModule { }
