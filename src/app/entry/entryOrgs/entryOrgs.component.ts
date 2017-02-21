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
  shapeOther: string;
  attireOther: string;
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
        categories: {
          A_hymn_written_prior_to_1970: false,
          Newly_composed_hymn_within_the_last_10_years: false,
          Praise_and_Worship_Song_CCM: false,
          Psalm_Setting: false,
          Chant_Gregorian_Anglican_Pointed_or_Taize: false,
          Older_hymn_text_set_to_a_new_contemporary_tune_or_retuned: false,
          Song_from_another_country_or_World_Song: false,
          Secular_Song: false,
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
        },
        clothing: '',
        ethnicities: {
          White: false,
          Asian_Chinese_Heritage_Language: false,
          Asian_Indian: false,
          Asian_Southeast_Asian_Non_Chinese: false,
          Asian_Korean: false,
          Asian_Japanese: false,
          Black_African_American: false,
          Black_Sub_Saharan_African: false,
          Hispanic_Latino_Spanish_Central_South_American: false,
          Hispanic_Latino_Spanish_Caribbean: false,
          Native_American_Indigenous_Peoples: false,
          Native_Hawaiian_Pacific_Islander: false,
          North_African_Middle_Eastern: false,
        },
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

    if (this.countryOther) {
      this.submission.data.country = this.countryOther;
    }
    if (this.denomOther) {
      this.submission.data.denomination = this.denomOther;
    }
    if (this.geoOther) {
      this.submission.data.geographic_area = this.geoOther;
    }
    if (this.shapeOther) {
      this.submission.data.shape = this.shapeOther;
    }
    if (this.attireOther) {
      this.submission.data.clothing = this.attireOther;
    }
    console.log(this.submission);
    this.submitService.submitOrgs(this.submission).then(() => location.reload());
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