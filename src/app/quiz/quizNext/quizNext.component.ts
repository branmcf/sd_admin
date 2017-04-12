import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContentfulService } from './../../services/contentful.service';
import { QuizService } from './../../services/quiz.service';

@Component({
  selector: 'hymn-quiz-next',
  templateUrl: './quizNext.html',
  styleUrls: ['./quizNext.scss']
})

export class QuizNextComponent implements OnInit {
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
      image: 'https://static.pexels.com/photos/26045/pexels-photo-26045.jpg',
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
      image: 'https://static.pexels.com/photos/242492/pexels-photo-242492.jpeg',
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

  constructor (private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private contentful: ContentfulService) {
  }

  ngOnInit() {
    const quizAnswers = sessionStorage.getItem('quizAnswers');
  }

  navigate(type) {
    console.log(type);
    this.router.navigate(['quiz/results', type]);
  }
}
