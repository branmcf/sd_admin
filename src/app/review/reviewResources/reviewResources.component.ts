import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';
import { Resource } from './../../domain/submissions/submission'

@Component({
  selector: 'hymn-review-resources',
  templateUrl: './reviewResources.html',
})

export class ReviewResourcesComponent implements OnInit {
  resources: Resource[];
  id: number;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService) {

  }

  ngOnInit(){
    this.reviewService.getAllResources().then(resources => this.resources = resources);
    console.log(this.resources);
  }

}
