import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ReviewService } from './../../services/review.service';
import { QuizService } from './../../services/quiz.service';

@Component({
  selector: 'hymn-quiz-results',
  templateUrl: './quizResults.html',
  styleUrls: ['./quizResults.scss']
})

export class QuizResultsComponent implements OnInit {
  resources: any[];
  type: string;
  icon: string;
  private sub: any;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private quizService: QuizService) {
  }

  ngOnInit() {
    const quizAnswers = JSON.parse(sessionStorage.getItem('quizAnswers'));
    this.sub = this.route.params.subscribe(param => {
      if (param['type'] === 'events') {
        this.quizService.submitQuizEvents(quizAnswers).then(x => this.resources = x).catch(err => console.log(err));
        this.icon = 'event';
      } else if (param['type'] === 'congregations') {
        this.quizService.submitQuizCongregations(quizAnswers).then(x => this.resources = x).catch(err => console.log(err));
        this.icon = 'room';
      } else if (param['type'] === 'orgs') {
        this.quizService.submitQuizOrganizations(quizAnswers).then(x => this.resources = x).catch(err => console.log(err));
        this.icon = 'group_work';
        this.type = 'organization';
      } else if (param['type'] === 'persons') {
        this.quizService.submitQuizPersons(quizAnswers).then(x => this.resources = x).catch(err => console.log(err));
        this.icon = 'face';
      } else {
        this.quizService.submitQuizResources(quizAnswers, param['type']).then(x => this.resources = x).catch(err => console.log(err));
        this.icon = 'book';
      }
      this.type = param['type'];
    });
  }

  expand(resource) {
    if (resource.show) {
      resource.show = false;
    } else {
      resource.show = true;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
