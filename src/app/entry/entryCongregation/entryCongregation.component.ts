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
  shapeOther: string;
  attireOther: string;
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
          A_hymn_written_prior_to_1970: false,
          Newly_composed_hymn_within_the_last_10_years: false,
          Praise_and_Worship_Song_CCM: false,
          Psalm_Setting: false,
          Chant_Gregorian_Anglican_Pointed_or_Taize: false,
          Older_hymn_text_set_to_a_new_contemporary_tune_or_retuned: false,
          Song_from_another_country_or_World_Song: false,
          Secular_Song: false,
          Other: ''
        },
        instruments: {
          Acappella: false,
          Organ: false,
          Piano: false,
          Guitar_not_full_band: false,
          Band_guitar_bass_drums_etc: false,
          Orchestra_Wind_Ensemble: false,
          Handbells: false,
          Obligato_instruments_flute_clarinet_trumpet_etc: false,
          Other: ''
        },
        shape: '',
        clothing: '',
        geography: '',
        ethnicities: {
          White: false,
          Black: false,
          Hispanic_Latin_American_Caribbean: false,
          Native_American_Indigenous_Peoples: false,
          Asian: false,
          Middle_Eastern: false,
          Other: ''
        },
        attendance: ''
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
    if (this.shapeOther) {
      this.submission.data.shape = this.shapeOther;
    }
    if (this.attireOther) {
      this.submission.data.clothing = this.attireOther;
    }
    console.log(this.submission);
    this.submitService.submitCongregation(this.submission);
    location.reload();
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
