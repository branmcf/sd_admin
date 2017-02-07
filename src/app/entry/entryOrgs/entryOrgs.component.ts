import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContentfulService } from './../../services/contentful.service';
import { SubmitService } from './../../services/submit.service';
import * as country_list from 'country-list';
import * as countries from 'node-countries';


@Component({
  selector: 'hymn-entry-orgs',
  templateUrl: './entryOrgs.html',
})

export class EntryOrgsComponent implements OnInit {
  content: JSON;
  submission: any;
  countryOther: any;
  denomOther: any;
  geoOther: any;
  all_countries: [any];
  countries: any;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private contentful: ContentfulService,
    private submitService: SubmitService) {
      this.all_countries = country_list().getNames();
      this.countries = countries;
  }

  ngOnInit() {
    this.contentful.getOrgsForm().then((content) => {
      this.content = JSON.parse(content);
      window.scrollTo(0, 0);
    });
    this.route.params.forEach(x => this.load(+x['user.id']));

    this.submission = {
      type: 'Organization',
      data: {
        name: '',
        url: '',
        parent: '',
        denomination: '',
        city: '',
        state: '',
        country: 'United States',
        geographic_area: '',
        resource_free: '',
        event_free: '',
        membership_free: '',
        mission: '',
        method: ''
        }
    };
  }

    private load(id) {
    if (!id) {
      return;
    }

    var onload = (data) => {
      if (data) {
        this.submission = data;
      } else {

      }
    };
  }

  submit() {
    var userInfo = sessionStorage.getItem('userInfo');
    var obj = (JSON.parse(userInfo));

    this.submission.user = obj.first_name + ' ' + obj.last_name;
    this.submission.uid = obj.user_id;

    console.log((this.submission));
    if (this.countryOther) {
      this.submission.data.country = this.countryOther;
    }
    if (this.denomOther) {
      this.submission.data.denomination = this.denomOther;
    }
    if (this.geoOther) {
      this.submission.data.geographic_area = this.geoOther;
    }

    this.submitService.submitOrgs(this.submission);
  }

}
