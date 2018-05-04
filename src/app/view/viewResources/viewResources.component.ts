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
  allResources: any[];
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
        this.reviewService.getAllEvents('approved').then(x => {
          this.resources = x;
          this.allResources = x;
        }).catch(err => console.log(err));
        this.icon = 'event';
      } else if (param['type'] === 'congregations') {
        this.reviewService.getAllCongregations('approved').then(x => {
          this.resources = x;
          this.allResources = x;
        }).catch(err => console.log(err));
        this.icon = 'room';
      } else if (param['type'] === 'orgs') {
        this.reviewService.getAllOrganizations('approved').then(x => {
          this.resources = x;
          this.allResources = x;
        }).catch(err => console.log(err));
        this.icon = 'group_work';
        this.type = 'organization';
      } else if (param['type'] === 'persons') {
        this.reviewService.getAllPersons('approved').then(x => {
          this.resources = x;
          this.allResources = x;
        }).catch(err => console.log(err));
        this.icon = 'face';
      } else {
        this.reviewService.getAllResources('approved/type/' + param['type']).then(x => {
          this.resources = x;
          this.allResources = x;
        }).catch(err => console.log(err));
        this.icon = 'book';
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  search(term: string) {
    if (this.type === 'persons') {
      const res = _.filter(this.allResources, (x) => { return x.first_name.includes(term) ||
                                                              x.last_name.includes(term); });
      this.resources = res;
    } else if (this.type === 'events') {
      const res = _.filter(this.allResources, (x) => { return x.title.includes(term); });
      this.resources = res;
    } else if (this.type === 'congregations' || this.type === 'organization') {
      const res = _.filter(this.allResources, (x) => { return x.name.includes(term); });
      this.resources = res;
    } else {
      const res = _.filter(this.allResources, (x) => { return x.title.includes(term) ||
                                                              x.author.includes(term) ||
                                                              x.description.includes(term); });
      this.resources = res;
    }
  }

  clearSearch() {
    this.resources = this.allResources;
    this.searchTerm = '';
  }


  addClick(resource) {
    this.reviewService.addClick(resource.id);
    window.location.href =resource.url;
  }

  // TODO: fix below function to match function implementation
  // TODO: ensure expand resource calls function correctly
  addLike(resource) {
    if (typeof resource.hasBeenLiked === "undefined"){
    resource.likes = resource.likes + 1
    this.reviewService.addLike(resource.id);
    resource.hasBeenLiked = true
  }
  }

  expand(resource) {
    if (resource.show) {
      resource.show = false;
    } else {
      this.reviewService.addView(resource.id);
      resource.show = true;
    }
  }
}
