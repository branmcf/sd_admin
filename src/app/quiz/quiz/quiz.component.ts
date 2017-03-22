import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContentfulService } from './../../services/contentful.service';

@Component({
  selector: 'hymn-quiz',
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.scss']
})

export class QuizComponent implements OnInit {
    public index = 0;
    public questions = [
        {
            question: 'Which types of song/hymn(s) has your congregation sung in the last 2 months?',
            answers: [
                'A hymn written prior to 1970',
                'Newly composed hymn (within the last 10 years)',
                'A song written by our own artist/leader',
                'Praise and Worship Song (CCM)',
                'Psalm Setting',
                'Chant (Gregorian, Anglican, Pointed or Taize)',
                'Older hymn text set to a new contemporary tune (or re-tuned)',
                'Song from another country (or World Song)',
                'Secular Song'
            ],
        },
        {
            question: 'Select instrumental leadership do you use in worship?',
            answers: [
                'Acappella',
                'Organ',
                'Piano',
                'Guitar (not full band)',
                'Band (guitar, bass, drums, etc...)',
                'Orchestra/Wind Ensemble',
                'Handbells',
                'Obligato Instruments (flute, clarinet, trumpet, etc...)',
            ],
         },
        {
            question: 'What vocal leadership do you use in worship?',
            answers: [
                'Choir',
                'Cantor',
                'Song-Enlivener',
                'Lead Singer from Band (Solo)',
                'Lead Singer from Band with Other Vocalists',
            ]
        },
        {
            question: 'Which best describes the shape of your worship?',
            answers: [
                '5-Fold Pattern (Gathering, Word, Response, Table, Sending) - Roman Catholic Mass and similar structures',
                '4-Fold Pattern (Gathering, Word, Response, Sending) - Communion monthly or quarterly',
                '2-Fold Pattern (Praise & Teaching) - Most Praise and Worship services'
            ],
        },

        {
            question: 'What does your pastor/priest wear when he/she preaches?',
            answers: [
                'Vestments',
                'Robes, with or without stoles',
                'Business Attire',
                'Casual',
            ],
        },
        {
            question: 'What ethnicities/races make up at least 20% of your congregation?',
            answers: [
                'Asian - Chinese Language/Heritage',
                'Asian - Indian',
                'Asian - Southeast Asian Non-Chinese',
                'Asian - Korean',
                'Asian - Japanese',
                'Black - African-American',
                'Black - Sub-Saharan African',
                'Hispanic/Latino/Spanish - Central/South American',
                'Hispanic/Latino/Spanish - Caribbean',
                'Native American/Indigenous Peoples',
                'Native American/Pacific Islander',
                'North African/Middle Eastern',
                'White',
            ]
        },
        {
            question: 'On average, how many people attend your weekly worship services?',
            answers: [
                'Under 100',
                'Between 100 and 250',
                'Between 250 and 500',
                'Between 500 and 1000',
                'Over 1000',
            ],
        },
    ];

  constructor (private route: ActivatedRoute,
    private router: Router,
    private contentful: ContentfulService) {
  }

  ngOnInit() {}

  navigate(type) {
    console.log(type);
    this.router.navigate(['view/resources', type]);
  }

  next() {
      this.index += 1;
  }

  previous() {
      this.index -= 1;
  }
}
