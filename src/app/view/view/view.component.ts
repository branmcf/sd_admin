import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ReviewService } from './../../services/review.service';

@Component({
  selector: 'hymn-view',
  templateUrl: './view.html',
  styleUrls: ['./view.scss']
})

export class ViewComponent implements OnInit {
  tiles = [
    {text: 'Readings/Audio', cols: 1, rows: 1, color: 'lightblue', icon: 'book'},
    {text: 'Congregations', cols: 1, rows: 1, color: 'lightgreen', icon: 'room'},
    {text: 'Organizations', cols: 1, rows: 1, color: 'lightpink', icon: 'group_work'},
    {text: 'Events', cols: 1, rows: 1, color: 'lightblue', icon: 'event'},
    {text: 'Persons', cols: 1, rows: 1, color: 'lightgreen', icon: 'face'},
    {text: '6', cols: 1, rows: 1, color: 'lightpink'},
  ];
  constructor (private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {}
}
