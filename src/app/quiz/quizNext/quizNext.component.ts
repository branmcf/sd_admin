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
      image: 'https://s3-us-west-2.amazonaws.com/hymndbphotos/books-education-school-literature-48126.jpg',
      routerLink: 'book'
    },
    {text: 'Hymnals / Songbooks', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://s3-us-west-2.amazonaws.com/hymndbphotos/praise-to-god-hymnal-church-catholic-161287.jpg',
      routerLink: 'hymnal'
    },
    {text: 'Thesis / Dissertation', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://s3-us-west-2.amazonaws.com/hymndbphotos/open-book-library-education-read-159621.jpg',
      routerLink: 'thesis'
    },
    {text: 'Articles', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://s3-us-west-2.amazonaws.com/hymndbphotos/pexels-photo-267569.jpg',
      routerLink: 'article'
    },
    {text: 'Blog', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://s3-us-west-2.amazonaws.com/hymndbphotos/startup-photos.jpg',
      routerLink: 'blog'
    },
    {text: 'Forum', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://s3-us-west-2.amazonaws.com/hymndbphotos/pexels-photo-261706.jpg',
      routerLink: 'forum'
    },
    {text: 'Newsletter / E-News', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://s3-us-west-2.amazonaws.com/hymndbphotos/pexels-photo-518543.jpg',
      routerLink: 'newsletter'
    },
    {text: 'Audio Tracks', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://s3-us-west-2.amazonaws.com/hymndbphotos/microphone-audio-computer-sound-recording-55800.jpg',
      routerLink: 'audio'
    },
    {text: 'Podcast', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://s3-us-west-2.amazonaws.com/hymndbphotos/pexels-photo-635005.jpg',
      routerLink: 'podcast'
    },
    {text: 'Video / Visuals', cols: 1, rows: 1, color: 'lightblue', icon: 'book',
      image: 'https://s3-us-west-2.amazonaws.com/hymndbphotos/pexels-photo-66134.jpg',
      routerLink: 'video'
    },
    {text: 'Congregations', cols: 1, rows: 1, color: 'lightgreen', icon: 'room',
      image: 'https://s3-us-west-2.amazonaws.com/hymndbphotos/pexels-photo-133699.jpg',
      routerLink: 'congregations'
    },
    {text: 'Organizations', cols: 1, rows: 1, color: 'lightpink', icon: 'group_work',
      image: 'https://s3-us-west-2.amazonaws.com/hymndbphotos/pexels-photo-296883.jpg',
      routerLink: 'orgs'
    },
    {text: 'Events', cols: 1, rows: 1, color: 'lightblue', icon: 'event',
      image: 'https://s3-us-west-2.amazonaws.com/hymndbphotos/people-eiffel-tower-lights-night.jpg',
      routerLink: 'events'
    },
    {text: 'Persons', cols: 1, rows: 1, color: 'lightgreen', icon: 'face',
      image: 'https://s3-us-west-2.amazonaws.com/hymndbphotos/pexels-photo-296881.jpg',
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
