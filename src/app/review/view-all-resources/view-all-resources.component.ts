import { Component, Input, Output, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';
import { CdkTableModule } from '@angular/cdk/table';
import { MdDialog, MdDialogRef } from '@angular/material';
// import { ResourceDialog } from '../../edit/editResources/editResources.component';
import { ResourceDialogNew } from './../reviewResources/reviewResources.component';



@Component({
  selector: 'app-view-all-resources',
  templateUrl: './view-all-resources.component.html'
})
export class ViewAllResourcesComponent implements OnInit {
  dialogRef: MdDialogRef<ResourceDialogNew>;
  resources: any[];
  id: number;
  arrLen: Number;
  resource: any;
  submission: any;

  constructor (private route: ActivatedRoute,
    private router: Router,
    public dialog: MdDialog,
    private reviewService: ReviewService) {
      this.reviewService.getAllResourcesCombined()
        .then(x => this.resources = x['resources'])
        .then(x => this.arrLen = this.resources.length)
        .then(x => console.log('ARE LEN IS: ', this.arrLen))
        .then(x => console.log('RESOURCES ARE: ', this.resources))
        .catch(err => {});
  }

  ngOnInit() {}
  // edit(id) {
  //   this.router.navigate(['/entry/review/resources', id]);
  // }

  edit(resource) {
    this.openDialog(resource);
    console.log('LOGGING FROM EDIT CALL: ', resource);
  }

openDialog(resource) {
  let dialogRef = this.dialog.open(ResourceDialogNew, {
    disableClose: false,
    width: '90%',
    height: '90%',
  });
  dialogRef.componentInstance.passedResource = resource;
  this.createObject(resource);
  dialogRef.afterClosed().subscribe(result => {
      if (result === 'submitEdit') {
          this.submitEdit(resource);
      }
      else {
          window.location.reload(true);
      }
  });
}

submitEdit(resource) {
  this.submission.data = resource.data;
  this.submission.user = resource.user;

  this.reviewService.editResource(this.id, this.submission).then(() => {
      this.router.navigate(['/review/resources']);
  });
}

createObject(resource) {
  const categories = {};
  const topics = {};
  const accompaniment = {};
  const languages = {};
  const ensembles = {};
  const ethnicities = {};

  for(const i of resource.data.categories) {
    categories[i] = true;
  }
  for(const i of resource.data.topics) {
    topics[i] = true;
  }
  for(const i of resource.data.accompaniment) {
    accompaniment[i] = true;
  }
  for(const i of resource.data.languages) {
    languages[i] = true;
  }
  for(const i of resource.data.ensembles) {
    ensembles[i] = true;
  }
  for(const i of resource.data.ethnicities) {
    ethnicities[i] = true;
  }

  resource.data.categories = categories;
  resource.data.topics = topics;
  resource.data.accompaniment = accompaniment;
  resource.data.languages = languages;
  resource.data.ensembles = ensembles;
  resource.data.ethnicities = ethnicities;
}

}
