import { Component, Input, Output, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'hymn-edit-resources',
  templateUrl: './editResources.html',
  styleUrls: ['./editResources.scss']
})

export class EditResourcesComponent implements OnInit {
  dialogRef: MdDialogRef<ResourceDialog>;
  id: number;
  resource: any;
  catArr: any[];
  approved: boolean;
  deleted: boolean;

  constructor (private route: ActivatedRoute,
    public dialog: MdDialog,
    private router: Router,
    private reviewService: ReviewService) {
  }

   openDialog(resource) {
    // console.log(resource);
    let dialogRef = this.dialog.open(ResourceDialog, {
      disableClose: false,
      width: '90%',
      height: '90%',
    });
    dialogRef.componentInstance.passedResource = resource;
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  ngOnInit() {
    this.route.params.forEach(x => this.load(+x['id']));
  }

    private load(id){
        if(!id) {
            return;
        }

        var onload = (data) => {
            if (data){
                this.id = id;
                data.categories = JSON.stringify(data);
                this.resource = data;
            }
        };
        this.reviewService.getResourceByID(id).then(onload);
    }


    approve(id) {
        this.reviewService.approveResource(this.id);
        this.router.navigate(['/review/resources']);
    }
    
    edit(id) {
        // console.log(this.resource);
        // this.router.navigate(['../entry/resources']);
        this.openDialog(this.resource);
    }

    delete(id) {
        this.reviewService.deleteResource(this.id);
        this.router.navigate(['/review/resources']);
    }
}

@Component({
  selector: 'resource-dialog',
  template: `
    <div class="cong-dialog">
      <h1 md-dialog-title>Edit Resource</h1>
      <md-dialog-actions>

        <div class="panel-body">
            <div class="form-group">
                <label for="resourceTitle">
                    Title
                </label>
                <input type="text"
                id="resourceTitle" 
                class="form-control" 
                name="resourceTitle"
                [(ngModel)]="passedResource.data.title"/>
            </div>
        </div>

        <br>

        <div class="form-group">
                <label for="resourceType">Resource Type</label>
                <md-radio-group [(ngModel)]="passedResource.data.type" name="radioType">
                    <md-radio-button class="block-input" name="type" value="Audio Track(s)"> Audio Track(s)</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Article(s)"> Article(s)</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Blog"> Blog</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Book"> Book</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Forum"> Forum</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Hymnal/Songbook"> Hymnal/Songbook</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Newsletter/E-News"> Newsletter/E-News</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Podcast"> Podcast</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Video/Visual(s)"> Video/Visual(s)</md-radio-button>
                </md-radio-group>
        </div>

        <br>

        <div class="panel-body">
            <div class="form-group">
                <label for="resourceUrl">
                    URL
                </label>
                <input type="url"
                id="resourceUrl" 
                class="form-control" 
                name="resourceUrl"
                [(ngModel)]="passedResource.data.url"/>
            </div>
        </div>

        <br>

        <div class="panel-body">
            <div class="form-group">
                <label for="resourceAuthor">
                    Author/Creator
                </label>
                <input type="text"
                id="resourceAuthor" 
                class="form-control" 
                name="resourceAuthor"
                [(ngModel)]="passedResource.data.author"/>
            </div>
        </div>

        <br>

        <div class="panel-body">
            <div class="form-group">
                <label for="resourceParent">
                    Resource Description
                </label>
                <input type="text"
                id="resourceParent" 
                class="form-control" 
                name="resourceParent"
                [(ngModel)]="passedResource.data.parent"/>
            </div>
        </div>

        <br>

        <div class="panel-body">
            <div class="form-group">
                <label for="resourceDescription">
                    Description
                </label>
                <textarea 
                rows="4"
                cols="50"
                id="resourceDescription" 
                class="form-control" 
                name="resourceDescription"
                [(ngModel)]="passedResource.data.description"></textarea>
            </div>
        </div>

        <br>

       
      </md-dialog-actions>
    </div>
  `,
})

export class ResourceDialog {  
  passedResource: any;

  constructor(public dialogRef: MdDialogRef<ResourceDialog>) {
//   debugger;
}
    update() {

    }

}
