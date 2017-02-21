import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContentfulService } from './../../services/contentful.service';
import { SubmitService } from './../../services/submit.service';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'hymn-entry-resources',
  templateUrl: './entryResources.html',
  providers: [ContentfulService]
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
          A_hymn_written_prior_to_1970: false,
          Newly_composed_hymn_within_the_last_10_years: false,
          Song_by_local_church_musicians: false,
          Praise_and_Worship_Song_CCM: false,
          Psalm_Setting: false,
          Chant_Gregorian_Anglican_Pointed_or_Taize: false,
          Older_hymn_text_set_to_a_new_contemporary_tune_or_retuned: false,
          Song_from_another_country_or_World_Song: false,
          Secular_Song: false,
        },
        topics: {
          Psalm_Setting: false,
          Lectionary_Based: false,
          Social_Justice: false,
          Worship: false,
        },
        accompaniment: {
          Acappella: false,
          Organ: false,
          Piano: false,
          Guitar_no_band: false,
          Guitar_with_band: false,
          Orchestra: false,
          Handbells: false,
          Obligato: false,
        },
        languages: {
          English: false,
          Spanish: false,
          French: false,
        },
        ensembles: {
          Choir: false,
          Cantor: false,
          Song_Enlivener: false,
          Solo: false,
          Lead_Singer_from_Band_with_Other_Vocalists: false,
        },
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
    // location.reload();
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
