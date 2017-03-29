import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserService } from './../services/user.service';
import { AdminService } from './../services/admin.service';
import { QuizComponent } from './quiz/quiz.component';
import { QuizResultsComponent } from './quizResults/quizResults.component';
import { QuizNextComponent } from './quizNext/quizNext.component';

const routes: Routes = [
    { path: '', component: QuizComponent },
    { path: 'results', component: QuizNextComponent },
    { path: 'results/:type', component: QuizResultsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class QuizRoutingModule { }
