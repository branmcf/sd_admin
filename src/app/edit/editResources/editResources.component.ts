import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
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

  id: number;
  resource: any;
  catArr: any[];
  approved: boolean;
  deleted: boolean;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.route.params.forEach(x => this.load(+x['id']));
  }

    private load(id){
        if(!id) {
            return;
        }

        var onload = (data) => {
            if(data){
                this.id = id;
                data.categories = JSON.stringify(data);
                this.resource = data;
            }
        };
        this.reviewService.getResourceByID(id).then(onload);
    }


    approve(id) {
        this.reviewService.approveResource(this.id).then(() => {
            this.router.navigate(['/review/resources']);
        });
    }

    edit(id) {
        this.router.navigate([]);
    }

    delete(id) {
        this.reviewService.deleteResource(this.id);
        this.router.navigate(['/review/resources']);
    }
}

