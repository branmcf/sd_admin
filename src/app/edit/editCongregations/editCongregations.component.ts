import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';

@Component({
  selector: 'hymn-edit-congregation',
  templateUrl: './editCongregations.html',
})

export class EditCongregationsComponent implements OnInit {
  id: number;
  congregation: any;
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
                this.congregation = data;
            } 
        };      
        this.reviewService.getCongregationByID(id).then(onload);
    }

    approve(id) {
        this.router.navigate(['/review/congregations']);
    }

    delete(id) {
        this.router.navigate(['/review/congregations']);
    }
}
