import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContentfulService } from './../../services/contentful.service';
import { SubmitService } from './../../services/submit.service';
import * as country_list from 'country-list';
import * as countries from 'node-countries';
import { MdDialog, MdDialogRef } from '@angular/material';


@Component({
  selector: 'hymn-entry-person',
  templateUrl: './entryPerson.html',
})

export class EntryPersonComponent implements OnInit {
  content: JSON;
  submission: any;
  all_countries: [any];
  countries: any;
  dialogRef: MdDialogRef<PersonDialog>;

  constructor (private route: ActivatedRoute,
   public dialog: MdDialog,
    private router: Router,
    private contentful: ContentfulService,
    private submitService: SubmitService) {
      this.all_countries = country_list().getNames();
      this.countries = countries;
  }

    openDialog() {
    let dialogRef = this.dialog.open(PersonDialog, {
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
    this.contentful.getPersonForm().then((content) => {
      this.content = JSON.parse(content);
      window.scrollTo(0, 0);
    });
    this.route.params.forEach(x => this.load(+x['user.id']));

    this.submission = {
      type: 'Person',
      data: {
        first_name: '',
        last_name: '',
        email: '',
        city: '',
        state: '',
        country: 'United States',
        url: '',
        social_facebook: '',
        social_twitter: '',
        social_other: '',
        emphasis: '',
        hymn_soc_member: '',
        pract_schol: '',
        topics: {
          'Contemporary Song Band': false,
          'Traditional Hymnody': false,
          'Musician Pastor Relationship': false,
          'Cantoring': false,
          'Song Enlivening': false,
          'Keyboards': false,
          'Worship Planning': false
        },
        languages: {
          English: false,
          Spanish: false,
          French: false,
        },
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
        ensembles: {
          'Choir': false,
          'Cantor': false,
          'Song-Enlivener': false,
          'Lead Singer from Band (Solo)': false,
          'Lead Singer from Band with Other Vocalists': false,
        },
        categories: {
          'A hymn written prior to 1970': false,
          'Newly composed hymn (within the last 10 years)': false,
          'Praise and Worship Song (CCM)': false,
          'Psalm Setting': false,
          'Chant (Gregorian, Anglican, Pointed or Taize)': false,
          'Older hymn text set to a new contemporary tune (or re-tuned)': false,
          'World Song (a song not from the U.S. or Canada)': false,
          'Secular Song': false,
          'A song written by our own artist/leader': false,
          'Liturgical Music': false,
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
          'Descants': false,
          'Pre-Recorded Tracks/Accompaniments': false,
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
    // this.submitService.submitCongregation(this.submission);
    var userInfo = sessionStorage.getItem('userInfo');
    var obj = (JSON.parse(userInfo));

    this.submission.user = obj.first_name + ' ' + obj.last_name;
    this.submission.uid = obj.id;

    console.log(this.submission);
    this.submitService.submitPerson(this.submission).then(() => location.reload());
  }
}

@Component({
  selector: 'person-dialog',
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

export class PersonDialog {
  constructor(public dialogRef: MdDialogRef<PersonDialog>) {}

}