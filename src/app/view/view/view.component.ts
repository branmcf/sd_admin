import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContentfulService } from './../../services/contentful.service';

@Component({
  selector: 'hymn-view',
  templateUrl: './view.html',
  styleUrls: ['./view.scss']
})

export class ViewComponent implements OnInit {
  // tiles = [
  //   {text: 'Readings/Audio', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
  //     image: 'http://images.contentful.com/65c06hb0hter/1S90ly8y2QKAmCaE0Euooe/795a750a9b6b85fc2de48aa8f6d7d3df/noun_669383_cc.png'
  //   },
  //   {text: 'Congregations', cols: 1, rows: 1, color: 'lightgreen', icon: 'room',
  //     image: 'http://images.contentful.com/65c06hb0hter/3FzgPOXMuIEsegeSKqWwq/a989b44bcfc3adf7285f4873ca910bb5/noun_148876_cc.png'
  //   },
  //   {text: 'Organizations', cols: 1, rows: 1, color: 'lightpink', icon: 'group_work',
  //     image: 'http://images.contentful.com/65c06hb0hter/VMnkZl6AsEEWYkoC84GEA/a168f35d2363e1fc4a95c9bceee2a713/noun_680860_cc.png'
  //   },
  //   {text: 'Events', cols: 1, rows: 1, color: 'lightblue', icon: 'event',
  //     image: 'http://images.contentful.com/65c06hb0hter/3DKGM4Uv8IEamCgiQoyKOM/abb7b830b097dea7312f1106a609bd32/noun_561970_cc.png'
  //   },
  //   {text: 'Persons', cols: 1, rows: 1, color: 'lightgreen', icon: 'face',
  //     image: 'http://images.contentful.com/65c06hb0hter/51X0k8k9ZS0myaKIAUUise/9497f761c73887cc7745391edd69cb6d/noun_561365_cc.png'
  //   },
  // ];

  tiles = [
    {text: 'Books', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://static.pexels.com/photos/46274/pexels-photo-46274.jpeg',
      routerLink: 'book'
    },
    {text: 'Hymnals / Songbooks', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://static.pexels.com/photos/46227/hymnal-book-sing-music-46227.jpeg',
      routerLink: 'hymnal'
    },
    {text: 'Thesis / Dissertation', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://static.pexels.com/photos/51342/books-education-school-literature-51342.jpeg',
      routerLink: 'thesis'
    },
    {text: 'Articles', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://static.pexels.com/photos/209151/pexels-photo-209151.jpeg',
      routerLink: 'article'
    },
    {text: 'Blog', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://static.pexels.com/photos/265667/pexels-photo-265667.jpeg',
      routerLink: 'blog'
    },
    {text: 'Forum', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://static.pexels.com/photos/209151/pexels-photo-209151.jpeg',
      routerLink: 'forum'
    },
    {text: 'Newsletter / E-News', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://static.pexels.com/photos/209151/pexels-photo-209151.jpeg',
      routerLink: 'newsletter'
    },
    {text: 'Audio Tracks', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://static.pexels.com/photos/185030/pexels-photo-185030.jpeg',
      routerLink: 'audio'
    },
    {text: 'Podcast', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://static.pexels.com/photos/227661/pexels-photo-227661.jpeg',
      routerLink: 'podcast'
    },
    {text: 'Video / Visuals', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://static.pexels.com/photos/34407/pexels-photo.jpg',
      routerLink: 'video'
    },
    {text: 'Congregations', cols: 1, rows: 1, color: 'lightgreen', icon: 'room',
      image: 'https://static.pexels.com/photos/161060/church-bank-wood-benches-161060.jpeg',
      routerLink: 'congregations'
    },
    {text: 'Organizations', cols: 1, rows: 1, color: 'lightpink', icon: 'group_work',
      image: 'https://static.pexels.com/photos/207896/pexels-photo-207896.jpeg',
      routerLink: 'orgs'
    },
    {text: 'Events', cols: 1, rows: 1, color: 'lightblue', icon: 'event',
      image: 'https://static.pexels.com/photos/3867/explosion-firework-new-year-s-eve-december-31.jpg',
      routerLink: 'events'
    },
    {text: 'Persons', cols: 1, rows: 1, color: 'lightgreen', icon: 'face',
      image: 'https://static.pexels.com/photos/185405/pexels-photo-185405.jpeg',
      routerLink: 'persons'
    },
  ];

  /*
    3FzgPOXMuIEsegeSKqWwq
    3DKGM4Uv8IEamCgiQoyKOM
    51X0k8k9ZS0myaKIAUUise
    VMnkZl6AsEEWYkoC84GEA
    1S90ly8y2QKAmCaE0Euooe
  */
  constructor (private route: ActivatedRoute,
    private router: Router,
    private contentful: ContentfulService) {
  }

  ngOnInit() {}

  navigate(type) {
    console.log(type);
    this.router.navigate(['view/resources', type]);
  }
}
