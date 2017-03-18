import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ReviewService } from './../../services/review.service';

@Component({
  selector: 'hymn-view-resources',
  templateUrl: './viewResources.html',
  styleUrls: ['./viewResources.scss']
})

export class ViewResourcesComponent implements OnInit {
  resources: any[];
  type: string;
  icon: string;
  private sub: any;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(param => {
      if (param['type'] === 'events') {
        this.reviewService.getAllEvents().then(x => this.resources = x).catch(err => console.log(err));
        this.icon = 'event';
      } else if (param['type'] === 'congregations') {
        this.reviewService.getAllCongregations().then(x => this.resources = x).catch(err => console.log(err));
        this.icon = 'room';
      } else if (param['type'] === 'orgs') {
        this.reviewService.getAllOrganizations().then(x => this.resources = x).catch(err => console.log(err));
        this.icon = 'group_work';
      } else if (param['type'] === 'persons') {
        this.reviewService.getAllPersons().then(x => this.resources = x).catch(err => console.log(err));
        this.icon = 'face';
      } else if (param['type'] === 'resources') {
        this.reviewService.getAllResources().then(x => this.resources = x).catch(err => console.log(err));
        this.icon = 'book';
      }
      this.type = param['type'];
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
