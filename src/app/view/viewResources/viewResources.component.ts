import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ReviewService } from './../../services/review.service';
import * as _ from 'lodash';

@Component({
  selector: 'hymn-view-resources',
  templateUrl: './viewResources.html',
  styleUrls: ['./viewResources.scss']
})

export class ViewResourcesComponent implements OnInit {
  resources: any[];
  type: string;
  icon: string;
  searchTerm: string;
  private sub: any;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(param => {
      this.type = param['type'];
      if (param['type'] === 'events') {
        this.reviewService.getAllEvents('approved').then(x => this.resources = x).catch(err => console.log(err));
        this.icon = 'event';
      } else if (param['type'] === 'congregations') {
        this.reviewService.getAllCongregations('approved').then(x => this.resources = x).catch(err => console.log(err));
        this.icon = 'room';
      } else if (param['type'] === 'orgs') {
        this.reviewService.getAllOrganizations('approved').then(x => this.resources = x).catch(err => console.log(err));
        this.icon = 'group_work';
        this.type = 'organization';
      } else if (param['type'] === 'persons') {
        this.reviewService.getAllPersons('approved').then(x => this.resources = x).catch(err => console.log(err));
        this.icon = 'face';
      } else {
        this.reviewService.getAllResources('approved/type/' + param['type']).then(x => this.resources = x).catch(err => console.log(err));
        this.icon = 'book';
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  search(term: string) {
    const res = ['thinking out loud', 'this', 'is', 'abcde', 'omg', 'omg', 'this'];
    console.log(res.indexOf(term));
  }

  expand(resource) {
    if (resource.show) {
      resource.show = false;
    } else {
      resource.show = true;
    }
  }
}
