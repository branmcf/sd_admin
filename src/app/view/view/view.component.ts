import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContentfulService } from './../../services/contentful.service';

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
  ];
  constructor (private route: ActivatedRoute,
    private router: Router,
    private contentful: ContentfulService) {
  }

  ngOnInit() {}
}
