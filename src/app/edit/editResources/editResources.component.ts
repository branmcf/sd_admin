import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';

@Component({
  selector: 'hymn-edit-resources',
  templateUrl: './editResources.html',
})

export class EditResourcesComponent implements OnInit {
  obj: {   
      id: number;
  }
  id: number;
  resource: any;
  catArr: any[];
  approved: boolean;
  eleted: boolean;

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
                this.resource = data;
            }
        };
        this.reviewService.getResourceByID(id).then(onload);
    }


    approve(id) {
        console.log(this.id);
        this.reviewService.approveResource(this.id);
        this.router.navigate(['/review/resources']);
    }

    delete(id) {
        this.router.navigate(['/review/resources']);
    }
}
