import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';

@Component({
  selector: 'hymn-edit-person',
  templateUrl: './editPerson.html',
})

export class EditPersonComponent implements OnInit {
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
        this.reviewService.getPersonByID(id).then(onload);
    }


    approve(id) {
        this.router.navigate(['/review/person']);
    }

    delete(id) {
        this.router.navigate(['/review/person']);
    }
}
