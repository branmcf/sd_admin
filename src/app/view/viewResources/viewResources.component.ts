import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ReviewService } from './../../services/review.service';

@Component({
  selector: 'hymn-view-resources',
  templateUrl: './viewResources.html',
})

export class ViewResourcesComponent implements OnInit {
  resources: any[];
  id: number;
  private sub: any;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService) {
      this.reviewService.getAllResources().then(x => this.resources = x);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(param => {
        console.log(param['type']);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  edit(id) {
    this.router.navigate(['/entry/review/resources', id]);
  }
}
