import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';

@Component({
  selector: 'hymn-review-congregations',
  templateUrl: './reviewCongregations.html',
})

export class ReviewCongregationsComponent implements OnInit {
  resources: any[];
  id: number;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService) {

      this.reviewService.getAllCongregations().then(x => this.resources = x);
  }

  ngOnInit() {}
}
