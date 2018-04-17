import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';

@Component({
  selector: 'app-view-all-resources',
  templateUrl: './view-all-resources.component.html',
  styleUrls: []
})
export class ViewAllResourcesComponent implements OnInit {
  resources: any[];
  id: number;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService) {
      this.reviewService.getAllResources()
        .then(x => this.resources = x)
        .then(x => console.log('RESOURCES ARE: ', this.resources))
        .catch(err => {});
  }

  ngOnInit() {}

  edit(id) {
    this.router.navigate(['/entry/review/resources', id]);
  }

}
