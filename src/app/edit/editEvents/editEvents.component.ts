import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';

@Component({
  selector: 'hymn-edit-event',
  templateUrl: './editEvents.html',
})

export class EditEventsComponent implements OnInit {
  id: number;
  event: any;
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
                this.event = data;
            }
        };
        this.reviewService.getEventByID(id).then(onload);
    }

    approve(id) {
        this.router.navigate(['/review/events']);
    }

    delete(id) {
        this.router.navigate(['/review/events']);
    }
}
