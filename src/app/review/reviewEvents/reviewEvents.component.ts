import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';
import { Resource } from './../../domain/submissions/submission';

@Component({
  selector: 'hymn-review-events',
  templateUrl: './reviewEvents.html',
})

export class ReviewEventsComponent implements OnInit {
  resources: Resource[];
  id: number;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService) {

      this.reviewService.getAllEvents().then(x => this.resources = x);
  }

  ngOnInit() {}
}
