import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';
// import { MdTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';


@Component({
  selector: 'app-view-all-resources',
  templateUrl: './view-all-resources.component.html'
})
export class ViewAllResourcesComponent implements OnInit {
  resources: any[];
  id: number;
  arrLen: Number;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService) {
      this.reviewService.getAllResourcesCombined()
        .then(x => this.resources[0] = x)
        .then(x => this.arrLen = this.resources[0].length)
        .then(x => console.log('ARE LEN IS: ', this.arrLen))
        .then(x => console.log('RESOURCES ARE: ', this.resources))
        .catch(err => {});
  }

  ngOnInit() {}

  edit(id) {
    this.router.navigate(['/entry/review/resources', id]);
  }

}
