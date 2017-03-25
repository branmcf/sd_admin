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

        <div class="form-group">
            <label for="account_name">
                Title
            </label>
            <input type="text"
            id="resourceTitle" 
            class="form-control" 
            name="resourceTitle"
            value="{{ passedResource.data.title }}"/>
        </div>

      </md-dialog-actions>
    </div>
  `,
})

export class ResourceDialog {  
  passedResource: any;

  constructor(public dialogRef: MdDialogRef<ResourceDialog>) {
//   debugger;
}

}
