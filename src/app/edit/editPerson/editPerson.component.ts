import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';

@Component({
  selector: 'hymn-edit-person',
  templateUrl: './editPerson.html',
  styleUrls: ['./editPerson.scss']
})

export class EditPersonComponent implements OnInit {
  id: number;
  person: any;
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

    private load(id) {
        if (!id) {
            return;
        }

        var onload = (data) => {
            if (data) {
                this.id = id;
                this.person = data;
            }
        };
        this.reviewService.getPersonByID(id).then(onload);
    }


    approve(id) {
        this.reviewService.approvePerson(this.id);
        this.router.navigate(['/review/person']);
    }

    delete(id) {
        this.reviewService.deletePerson(this.id);
        this.router.navigate(['/review/person']);
    }
}
