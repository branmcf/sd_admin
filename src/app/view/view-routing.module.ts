import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserService } from './../services/user.service';
import { AdminService } from './../services/admin.service';
import { ViewComponent } from './view/view.component';
import { ViewResourcesComponent } from './viewResources/viewResources.component';

const routes: Routes = [
    { path: '', component: ViewComponent },
    { path: 'resources/:type', component: ViewResourcesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ViewRoutingModule { }
