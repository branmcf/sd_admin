import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContentfulService } from './../../services/contentful.service';
import { UserService } from './../../services/user.service'

@Component({
  selector: 'hymn-entry-landing',
  templateUrl: './entryLanding.html',
})

export class EntryLandingComponent {

  constructor() {}

  ngOnInit() {} 
}