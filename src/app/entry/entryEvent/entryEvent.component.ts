import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContentfulService } from './../../services/contentful.service';
import { SubmitService } from './../../services/submit.service';
import * as country_list from 'country-list';
import * as countries from 'node-countries';
import { MdDialog, MdDialogRef } from '@angular/material';


@Component({
  selector: 'hymn-entry-event',
  templateUrl: './entryEvent.html',
})

export class EntryEventComponent implements OnInit {
  content: JSON;
  submission: any;
  eventOccurance: any;
  shapeOther: string;
  attireOther: string;
  all_countries: [any];
  countries: any;
   dialogRef: MdDialogRef<EventDialog>;

  constructor (private route: ActivatedRoute,
   public dialog: MdDialog,
    private router: Router,
    private contentful: ContentfulService,
    private submitService: SubmitService) {
      this.all_countries = country_list().getNames();
      this.countries = countries;
  }

    openDialog() {
    let dialogRef = this.dialog.open(EventDialog, {
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
    this.contentful.getEventForm().then((content) => {
      this.content = JSON.parse(content);
      window.scrollTo(0, 0);
    });
    this.route.params.forEach(x => this.load(+x['user.id']));

    this.submission = {
      type: 'Event',
      data: {
        title: '',
        occurance: '',
        url: '',
        parent: '',
        theme: '',
        description: '',
        event_start_date: '',
        event_end_date: '',
        cost: '',
        city: '',
        state: '',
        country: 'United States',
        hymn_soc_member: '',
        ensembles: {
          Choir: false,
          Cantor: false,
          Song_Enlivener: false,
          Solo: false,
          Lead_Singer_from_Band_with_Other_Vocalists: false,
        },
        clothing: '',
        attendance: '',
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

    if (this.eventOccurance) {
      this.submission.data.occurance = this.eventOccurance;
    }
    if (this.shapeOther) {
      this.submission.data.shape = this.shapeOther;
    }
    if (this.attireOther) {
      this.submission.data.clothing = this.attireOther;
    }
    console.log(this.submission);
    this.submitService.submitEvent(this.submission);
    location.reload();
  }
}

@Component({
  selector: 'event-dialog',
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

export class EventDialog {
  constructor(public dialogRef: MdDialogRef<EventDialog>) {}

}