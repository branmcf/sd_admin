import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toLogIn() {
    this.router.navigate(['entry/']);
  }

  toViewAll() {
    this.router.navigate(['view/']);
  }

}
