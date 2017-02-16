import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';

@Component({
  selector: 'hymn-edit-resources',
  templateUrl: './editResources.html',
})

export class EditResourcesComponent implements OnInit {
  id: number;
  resource: any;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.route.params.forEach(x => this.load(+x['id']));
  }

    private load(id){
        if(!id) {
            console.log("No ID sent in");
            return;
        }
        else {


            console.log("Something was sent in?")
        }

        var onload = (data) => {
            if(data){
                this.resource = data;
                console.log("Loaded in data");
                
            } else {
                console.log("ID doesn't correspond to anything");
            }
        };      

        this.reviewService.getResourceByID(id).then(onload);
       
    }

    lol();
    lol() {
        console.log(this.resource);
    }

}
