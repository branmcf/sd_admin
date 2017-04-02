import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserService } from './../services/user.service';
import { AdminService } from './../services/admin.service';
import { QuizService } from './../services/quiz.service';

import { QuizComponent } from './quiz/quiz.component';
import { QuizResultsComponent } from './quizResults/quizResults.component';
import { QuizNextComponent } from './quizNext/quizNext.component';

const routes: Routes = [
    { path: '', component: QuizComponent },
    { path: 'results', component: QuizNextComponent, canActivate: [QuizService] },
    { path: 'results/:type', component: QuizResultsComponent, canActivate: [QuizService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class QuizRoutingModule { }
