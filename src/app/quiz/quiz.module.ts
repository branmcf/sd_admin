import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { HeaderModule } from '../header/header.module';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import { QuizResultsComponent } from './quizResults/quizResults.component';
import { QuizNextComponent } from './quizNext/quizNext.component';


@NgModule({
  id: 'quiz',
  imports: [
    RouterModule,
    CommonModule,
    HttpModule,
    HeaderModule,
    FormsModule,
    MaterialModule.forRoot(),
  ],
  declarations: [
    QuizComponent,
    QuizResultsComponent,
    QuizNextComponent,
  ],
  exports: [
    QuizRoutingModule
  ]
})
export class QuizModule { }





