import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContentfulService } from './../../services/contentful.service';
import { SubmitService } from './../../services/submit.service';
import * as country_list from 'country-list';
import * as countries from 'node-countries';
import { MdDialog, MdDialogRef } from '@angular/material';


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
  dialogRef: MdDialogRef<OrgsDialog>;

  constructor (private route: ActivatedRoute,
   public dialog: MdDialog,
    private router: Router,
    private contentful: ContentfulService,
    private submitService: SubmitService) {
      this.all_countries = country_list().getNames();
      this.countries = countries;
  }

    openDialog() {
    let dialogRef = this.dialog.open(OrgsDialog, {
      disableClose: false,
      width: '30%',
      height: '30%',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'submit') {
        this.submit();
      }
    });
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
        is_org_free: '',
        events_free: '',
        membership_free: '',
        mission: '',
        process: '',
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
    this.submission.uid = obj.id;

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
    console.log(this.submission);
    this.submitService.submitOrgs(this.submission);
    location.reload();
  }
}

@Component({
  selector: 'orgs-dialog',
  template: `
    <div class="cong-dialog">
      <h1 md-dialog-title>Are you sure you want to submit?</h1>
      <md-dialog-actions>
          <button md-button md-raised-button color="primary" (click)="dialogRef.close('submit')">Submit</button>
          <button md-button md-dialog-close>Cancel</button>
      </md-dialog-actions>
    </div>
  `,
})

export class OrgsDialog {
  constructor(public dialogRef: MdDialogRef<OrgsDialog>) {}

}