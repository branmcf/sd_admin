import { Component } from '@angular/core';
import { ContentfulService } from './services/contentful.service';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-root',
  template: require('./app.component.html')
})
export class AppComponent {
  constructor(private contentful: ContentfulService) {}
}
