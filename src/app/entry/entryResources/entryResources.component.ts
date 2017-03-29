import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContentfulService } from './../../services/contentful.service';
import { SubmitService } from './../../services/submit.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { EditResourcesComponent } from './../../edit/editResources/editResources.component'

@Component({
  selector: 'hymn-entry-resources',
  templateUrl: './entryResources.html',
  providers: [ContentfulService],
})

export class EntryResourcesComponent implements OnInit {
  content: JSON;
  submission: any;
  resourceTypeOther: any;
  dialogRef: MdDialogRef<ResourceDialog>;

  constructor (private route: ActivatedRoute,
   public dialog: MdDialog,
    private router: Router,
    private contentful: ContentfulService,
    private submitService: SubmitService) {
  }

    openDialog() {
    let dialogRef = this.dialog.open(ResourceDialog, {
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
    this.contentful.getResourcesForm().then((content) => {
      this.content = JSON.parse(content);
      window.scrollTo(0, 0);
    });

    this.route.params.forEach(x => this.load(+x['user.id']));

    this.submission = {
      type: 'Resource',
      user: '',
      uid: '',
      data: {
        title: '',
        type: '',
        url: '',
        author: '',
        parent: '',
        description: '',
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
          'Liturgical Music': false,
        },
        topics: {
          'Psalm Setting': false,
          'Lectionary Based': false,
          'Social Justice': false,
          'Worship': false,
        },
        accompaniment: {
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
        languages: {
          English: false,
          Spanish: false,
          French: false,
        },
        ensembles: {
         'Choir': false,
          'Cantor': false,
          'Song-Enlivener': false,
          'Lead Singer from Band (Solo)': false,
          'Lead Singer from Band with Other Vocalists': false,
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
        hymn_soc_member: '',
        is_free: '',
        pract_schol: '',
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

    if (this.resourceTypeOther) {
      this.submission.data.type = this.resourceTypeOther;
    }
    console.log((this.submission));
    this.submitService.submitResource(this.submission);
  }
}

@Component({
  selector: 'resource-dialog',
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

export class ResourceDialog {
  constructor(public dialogRef: MdDialogRef<ResourceDialog>) {}

}
