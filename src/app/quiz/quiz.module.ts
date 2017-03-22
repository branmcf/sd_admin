import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { HeaderModule } from '../header/header.module';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz/quiz.component';


@NgModule({
  id: 'quiz',
  imports: [
    RouterModule,
    CommonModule,
    HttpModule,
    HeaderModule,
    MaterialModule.forRoot(),
  ],
  declarations: [
    QuizComponent
  ],
  exports: [
    QuizRoutingModule
  ]
})
export class QuizModule { }





