import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingModule } from './landing/landing.module';
const routes: Routes = [
    {
        path: '',
        loadChildren: './landing/landing.module#LandingModule'
    },
    {
        path: 'entry',
        loadChildren: './entry/entry.module#EntryModule'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
