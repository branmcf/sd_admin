import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContentfulService } from './../../services/contentful.service';

@Component({
  selector: 'hymn-quiz-next',
  templateUrl: './quizNext.html',
  styleUrls: ['./quizNext.scss']
})

export class QuizNextComponent implements OnInit {
  tiles = [
    {text: 'Books, Hymnals/Songbooks, Thesis/Dissertation', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://static.pexels.com/photos/46274/pexels-photo-46274.jpeg',
      routerLink: 'resources'
    },
    {text: 'Articles, Blog, Forum, Newsletter/E-News', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://static.pexels.com/photos/209151/pexels-photo-209151.jpeg',
      routerLink: 'resources'
    },
    {text: 'Audio Tracks, Podcast, Video/Visuals', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://static.pexels.com/photos/185030/pexels-photo-185030.jpeg',
      routerLink: 'resources'
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

  constructor (private route: ActivatedRoute,
    private router: Router,
    private contentful: ContentfulService) {
  }

  ngOnInit() {}

  navigate(type) {
    console.log(type);
    this.router.navigate(['quiz/results', type]);
  }
}
