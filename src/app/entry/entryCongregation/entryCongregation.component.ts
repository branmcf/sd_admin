import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ContentfulService } from './../../services/contentful.service';
import * as country_list from 'country-list';
import * as countries from 'node-countries';
import { MdDialog, MdDialogRef } from '@angular/material';


@Component({
  selector: 'hymn-entry-congregation',
  templateUrl: './entryCongregation.html',
})

export class EntryCongregationComponent {
  content: JSON;
  data: any;
  submission: any;
  countryOther: string;
  denomOther: string;
  geographyOther: string;
  all_countries: [any];
  countries: any;
  dialogRef: MdDialogRef<CongDialog>;

  constructor(private route: ActivatedRoute,
    public dialog: MdDialog,
    private router: Router,
    private submitService: SubmitService,
    private contentful: ContentfulService) {
      this.all_countries = country_list().getNames();
      this.countries = countries;
  }

  openDialog() {
    let dialogRef = this.dialog.open(CongDialog, {
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
      this.contentful.getCongregationForm().then((content) => {
      this.content = JSON.parse(content);
      window.scrollTo(0, 0);
    });

    this.route.params.forEach(x => this.load(+x['user.id']));

    this.submission = {
      type: 'Congregation',
      user: '',
      uid: '',
      data: {
        name: '',
        url: '',
        denomination: '',
        city: '',
        state: '',
        country: 'United States',
        hymn_soc_member: '',
        categories: {
          'A hymn written prior to 1970': false,
          'Newly composed hymn (within the last 10 years)': false,
          'Praise and Worship Song (CCM)': false,
          'Psalm Setting': false,
          'Chant (Gregorian, Anglican, Pointed or Taize)': false,
          'Older hymn text set to a new contemporary tune (or re-tuned)': false,
          'Song from another country (or World Song)': false,
          'Secular Song': false,
          'A song written by our own artist/leader': false,

        },
        instruments: {
          'Acappella': false,
          'Organ': false,
          'Piano': false,
          'Guitar (not full band)': false,
          'Band (guitar, bass, drums, etc...)': false,
          'Orchestra/Wind Ensemble': false,
          'Handbells': false,
          'Obligato Instruments (flute, clarinet, trumpet, etc...)': false,
        },
        shape: {
          '5-Fold Pattern': false,
          '4-Fold Pattern': false,
          '2-Fold Pattern': false,
        },
        clothing: {
          'Vestments': false,
          'Robes, with or without stoles': false,
          'Business Attire': false,
          'Casual': false
        },
        geography: '',
        ethnicities: {
          'White': false,
          'Asian - Chinese Heritage/Language': false,
          'Asian - Indian': false,
          'Asian - Southeast Asian Non-Chinese': false,
          'Asian - Korean': false,
          'Asian - Japanese': false,
          'Black - African-American': false,
          'Black - Sub-Saharan African': false,
          'Hispanic/Latino/Spanish - Central/South American': false,
          'Hispanic/Latino/Spanish - Caribbean': false,
          'Native American/Indigenous Peoples': false,
          'Native American/Pacific Islander': false,
          'North African/Middle Easternn': false,
        },
        attendance: '',
      }
    };
  }

  private getUser() {

  }

  private load(id) {
    if (!id) {
      return;
    }

    var onload = (data) => {
      if (data) {
        this.data = data;
      }
      else {

      }
    };
  }

  submit() {
    // this.submitService.submitCongregation(this.submission);
    var userInfo = sessionStorage.getItem('userInfo');
    var obj = (JSON.parse(userInfo));

    this.submission.user = obj.first_name + ' ' + obj.last_name;
    this.submission.uid = obj.id;

    if (this.countryOther) {
      this.submission.data.country = this.countryOther;
    }
    if (this.denomOther) {
      this.submission.data.denomination = this.denomOther;
    }
    if (this.geographyOther) {
      this.submission.data.geography = this.geographyOther;
    }
    console.log(this.submission);
    this.submitService.submitCongregation(this.submission).then(() => location.reload());
  }
}

@Component({
  selector: 'cong-dialog',
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

export class CongDialog {
  constructor(public dialogRef: MdDialogRef<CongDialog>) {}

}
