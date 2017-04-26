import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'hymn-edit-event',
  templateUrl: './editEvents.html',
  styleUrls: ['./editEvents.scss']
})

export class EditEventsComponent implements OnInit {
  id: number;
  approved: boolean;
  deleted: boolean;
  event: any;
  submission: any;
  startDate: any;
  endDate: any;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    public dialog: MdDialog,) {
  }

   openDialog(event) {
    let dialogRef = this.dialog.open(EventDialog, {
      disableClose: false,
      width: '90%',
      height: '90%',
    });
    dialogRef.componentInstance.passedEvent = event;
    this.createObject(event);
    dialogRef.afterClosed().subscribe(result => {
        if (result === 'submitEdit') {
            this.submitEdit(event);
        }
        else {
            window.location.reload(true);
        }
    });
  }

  createObject(event) {
      const shape = {};
      const clothing = {};
      const ensembles = {};

      var count = 0;

      for(const i of event.data.shape) {
        shape[i] = true;
      }
      for(const i of event.data.clothing) {
        clothing[i] = true;
      }
      for(const i of event.data.ensembles) {
        ensembles[i] = true;
      }

      event.data.shape = shape;
      event.data.clothing = clothing;
      event.data.ensembles = ensembles;
  }

  ngOnInit() {
    this.route.params.forEach(x => this.load(+x['id']));
    this.submission = {};
  }

    private load(id) {
        if (!id) {
            return;
        }

        var onload = (data) => {
            if (data) {
                this.id = id;
                this.event = data;
                this.modifyDate();
            }
        };
        this.reviewService.getEventByID(id).then(onload);
    }

    modifyDate() {
        this.startDate = this.event.data.event_date.substr(0, 10);
        this.endDate = this.event.data.event_end_date.substr(0, 10);
    }

    approve(id) {
        this.reviewService.approveEvent(this.id).then(() => {
            this.router.navigate(['/review/events']);
        });
    }

    edit(id) {
        this.openDialog(this.event);
    }

    submitEdit(event) {
        this.submission.data = event.data;
        this.submission.user = event.user;
        
        this.reviewService.editEvent(this.id, this.submission).then(() => {
            this.router.navigate(['/review/events']);
        });
    }

    delete(id) {
        this.reviewService.deleteEvent(this.id).then(() => {
            this.router.navigate(['/review/events']);
        });
    }
}

@Component({
  selector: 'event-dialog',
  template:`
    <div>
        <form>
            <h1 md-dialog-title>Edit Event</h1>

            <div class="form-group">
                <label>
                    Event Title
                </label>
                <input type="text" 
                class="full-width"
                id="eventTitle"
                class="form-control" 
                [(ngModel)]="passedEvent.data.title"
                name="eventTitle"/>
            </div>

            <br>

            <div class="form-group">
            <fieldset>
                <legend for="eventOccurance">Is Your Event...</legend>
                    <md-radio-group [(ngModel)]="passedEvent.data.frequency" name="eventOccurance" required>
                        <md-radio-button class="block-input" name="occurance" value="Annual" required>Annual</md-radio-button>
                        <md-radio-button class="block-input" name="occurance" value="Every-Other-Year (once every 2 years)">Every-Other-Year (once every 2 years)</md-radio-button>
                        <md-radio-button class="block-input" name="occurance" value="One Time Only">One Time Only</md-radio-button>
                        <md-radio-button class="block-input" name="type">
                            <label for="eventFrequencyOccur">
                                Other Occurance
                            </label>
                            <input type="text" 
                            class="full-width"
                            id="frequencyOther" 
                            class="form-control" 
                            [(ngModel)]="frequencyOther"
                            name="eventOccuranceOther"/>
                        </md-radio-button>
                    </md-radio-group>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="eventType">What Type of Event is This?</legend>
                    <md-radio-group [(ngModel)]="passedEvent.data.type" name="eventType" required>
                        <md-radio-button class="block-input" name="type" value="One-Day Conference" required>One-Day Conference</md-radio-button>
                        <md-radio-button class="block-input" name="type" value="Multi-Day Conference">Multi-Day Conference</md-radio-button>
                        <md-radio-button class="block-input" name="type" value="Hymn Festival">Hymn Festival</md-radio-button>
                        <md-radio-button class="block-input" name="type" value="Concert">Concert</md-radio-button>
                        <md-radio-button class="block-input" name="type" value="Worship Service">Worship Service</md-radio-button>
                        <md-radio-button class="block-input" name="type">
                            <label for="eventTypeOther">
                                Other Type
                            </label>
                            <input type="text" 
                            class="full-width"
                            id="typeOther" 
                            class="form-control" 
                            [(ngModel)]="passedEvent.data.type"
                            name="passedEventOther"/>
                        </md-radio-button>
                    </md-radio-group>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
                <label for="eventUrl">
                    Event Website
                </label>
                <input class="full-width"
                type="url" 
                id="eventUrl" 
                class="form-control" 
                [(ngModel)]="passedEvent.data.url"
                name="eventUrl"/>
            </div>

            <br>

            <div class="form-group">
                <label for="eventParent">
                    Parent or Sponsoring Organization(s)
                </label>
                <input type="text" 
                class="full-width"
                id="eventParent" 
                class="form-control" 
                [(ngModel)]="passedEvent.data.parent"
                name="eventParent"/>         
            </div>

            <br>

            <div class="form-group">
                <label for="eventTopic">
                    Topic/Emphasis/Theme
                </label>
                <input 
                class="full-width"
                type="text"
                id="eventTopic" 
                class="form-control" 
                [(ngModel)]="passedEvent.data.theme"
                name="eventTopic"/>
            </div>

            <br>

            <div class="form-group">
                <label for="eventDesc">
                    Event Description
                </label>
                <input type="text" 
                class="full-width"
                id="eventDesc" 
                class="form-control" 
                [(ngModel)]="passedEvent.data.description"
                name="eventDesc"/>
            </div>

            <br>
            
            <div>
                <label for="eventDate">Event Start Date</label>
                <input type="date" 
                id="eventStartDate" 
                class="form-control" 
                [(ngModel)]="passedEvent.data.event_start_date"
                name="eventStartDate"/>

                <label for="eventDate">Event End Date</label>
                <input type="date" 
                id="eventEndDate" 
                class="form-control" 
                [(ngModel)]="passedEvent.data.event_end_date"
                name="eventEndDate"/>
            </div>

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="eventCost">Registration Cost</legend>
                    <md-radio-group [(ngModel)]="passedEvent.data.cost" name="eventCost" required>
                        <md-radio-button class="block-input" name="cost" value="Free" required>Free</md-radio-button>
                        <md-radio-button class="block-input" name="cost" value="Under $100">Under $100</md-radio-button>
                        <md-radio-button class="block-input" name="cost" value="Between $100 and $250">Between $100 and $250</md-radio-button>
                        <md-radio-button class="block-input" name="cost" value="Between $250 and $500">Between $250 and $500</md-radio-button>
                        <md-radio-button class="block-input" name="cost" value="Over $1000">Over $1000</md-radio-button>
                    </md-radio-group>
                </fieldset>
            </div> 

            <br>

            <div class="form-group">
                <label for="eventCountry">
                    Event Country
                </label>
                <input type="text" 
                class="full-width"
                id="eventCountry" 
                class="form-control" 
                [(ngModel)]="passedEvent.data.country"
                name="eventCountry"/>
            </div>

            <br>

            <div class="form-group">
                <label for="eventState">
                    Event State
                </label>
                <input type="text" 
                class="full-width"
                id="eventState" 
                class="form-control" 
                [(ngModel)]="passedEvent.data.state"
                name="eventState"/>
            </div>

            <br>

            <div class="form-group">
                <label>
                    Event City
                </label>
                <input class="full-width"
                type="text"
                id="eventCity" 
                class="form-control" 
                [(ngModel)]="passedEvent.data.city"
                name="eventCity"/>
            </div>
                    
            <br>

            <div class="form-group">
                <fieldset>
                <legend for="eventMember">Is a Hymn Society member involved?</legend>
                    <md-radio-group [(ngModel)]="passedEvent.data.hymn_soc_member" name="isMember" required>
                        <md-radio-button class="block-input" name="hymn_soc_member" value="true">Yes</md-radio-button>
                        <md-radio-button class="block-input" name="hymn_soc_member" value="false">No</md-radio-button>
                    </md-radio-group>
                </fieldset>
            </div> 

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="eventEnsemble">What ensembles help lead your event?</legend>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="personEnsembleOne"
                        [(ngModel)]="passedEvent.data.ensembles['Choir']">
                        Choir
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="personEnsembleTwo"
                        [(ngModel)]="passedEvent.data.ensembles['Cantor']">
                        Cantor
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="personEnsembleThree"
                        [(ngModel)]="passedEvent.data.ensembles['Song Enlivener']">
                        Song-Enlivener
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="personEnsembleFour"
                        [(ngModel)]="passedEvent.data.ensembles['Lead Singer from Band (Solo)']">
                        Lead Singer from Band (Solo)
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="personEnsembleFive"
                        [(ngModel)]="passedEvent.data.ensembles['Lead Singer from Band with Other Vocalists']">
                        Lead Singer from Band with Other Vocalists
                    </md-checkbox>
                    <md-checkbox class="block-input" name="other">
                        <label>
                            Other Ensemble
                        </label>
                        <input type="text"
                        class="full-width"
                        id="eventTopic" 
                        class="form-control" 
                        [(ngModel)]="passedEvent.data.ensembles.Other"
                        name="eventTopicOther"/>
                    </md-checkbox>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="eventShape">Which best describes the shape of your worship?</legend>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="shapeOne"
                    [(ngModel)]="passedEvent.data.shape['5-Fold Pattern']">
                    5-Fold Pattern (Gathering, Word, Response, Table, Sending) - Roman Catholic Mass and similar structures
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="shapeTwo"
                    [(ngModel)]="passedEvent.data.shape['4-Fold Pattern']">
                    4-Fold Pattern (Gathering, Word, Response, Sending) - Communion monthly or quarterly"
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="shapeThree"
                    [(ngModel)]="passedEvent.data.shape['2-Fold Pattern']">
                    2-Fold Pattern (Praise & Teaching) - Most Praise and Worship services
                </md-checkbox>
                <md-checkbox class="block-input">     
                    <label>
                        Other Shape of Worship  
                    </label>                 
                    <input type="text" 
                    class="full-width"
                    id="eventShape" 
                    class="form-control" 
                    [(ngModel)]="passedEvent.data.shape.Other"
                    name="eventShapeOther"/>
                </md-checkbox>
                </fieldset>
            </div> 

            <div class="form-group" >
                <fieldset>
                <legend for="eventAttire">What does your pastor/priest wear when he/she preaches?</legend>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="eventAttireFive"
                    [(ngModel)]="passedEvent.data.clothing['Vestments']">
                    Vestments</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="eventAttireSix"
                    [(ngModel)]="passedEvent.data.clothing['Robes, with or without stoles']">
                    Robes, with or without stoles</md-checkbox>       
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="eventAttireSeven"
                    [(ngModel)]="passedEvent.data.clothing['Business Attire']">
                    Business Attire</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="eventAttireEight"
                    [(ngModel)]="passedEvent.data.clothing['Casual']">
                    Casual</md-checkbox>
                <md-checkbox class="block-input">     
                    <label>
                        Other Forms of Attire
                    </label>                   
                    <input type="text"
                    class="full-width"
                    id="eventAttire" 
                    class="form-control" 
                    [(ngModel)]="passedEvent.data.clothing.Other"
                    name="eventAttire"
                    name="eventAttireOther"/>
                </md-checkbox>
                </fieldset>
            </div> 

            <div class="form-group">
                <fieldset>
                <legend for="eventAttendance">On average, how many people will attend your event?</legend>
                <md-radio-group [(ngModel)]="passedEvent.data.attendance" name="eventAttendance" required>
                    <md-radio-button class="block-input" value="Under 100" required> Under 100</md-radio-button>
                    <md-radio-button class="block-input" value="Between 100 and 250"> Between 100 and 250</md-radio-button>
                    <md-radio-button  class="block-input" value="Between 250 and 500"> Between 250 and 500</md-radio-button>
                    <md-radio-button  class="block-input" value="Between 500 and 1000"> Between 500 and 1000</md-radio-button>
                    <md-radio-button  class="block-input" value="Over 1000"> Over 1000</md-radio-button>
                </md-radio-group>
                </fieldset>
            </div>

            <md-card-actions>
              <button md-raised-button color="primary" type="submit" (click)="bind(); dialogRef.close('submitEdit');">
                Submit
              </button>
              <button md-button md-dialog-close (click)="dialogRef.close('cancel');">
                Cancel
              </button>
            </md-card-actions>

        </form>  
    </div>    

    `
  ,
  styleUrls: ['./editEvents.scss']
})

export class EventDialog {
    passedEvent: any;

    frequencyOther: any;
    
    clothingOther: any;
    shapeOther: any;
    ensemblesOther: any;

    constructor(public dialogRef: MdDialogRef<EventDialog>) {
    }

    ngOnInit() {
        this.checkOther();
    }

    checkOther() {
        for(const clothing of Object.keys(this.passedEvent.data.clothing)) {
            if(clothing !== 'Vestments'
            && clothing !== 'Robes, with or without stoles'
            && clothing !== 'Business Attire'
            && clothing !== 'Casual') {
                this.clothingOther = clothing;
                this.passedEvent.data.clothing.Other = clothing;
            }
        }

        for(const shape of Object.keys(this.passedEvent.data.shape)) {
            if(shape !== '5-Fold Pattern'
            && shape !== '4-Fold Pattern'
            && shape !== '2-Fold Pattern') {
                this.shapeOther = shape;
                this.passedEvent.data.shape.Other = shape;
            }
        }

        for(const ensembles of Object.keys(this.passedEvent.data.ensembles)) {
            if(ensembles !== 'Choir'
            && ensembles !== 'Cantor'
            && ensembles !== 'Song Enlivener'
            && ensembles !== 'Lead Singer from Band (Solo)'
            && ensembles !== 'Lead Singer from Band with Other Vocalists') {
                this.ensemblesOther = ensembles;
                this.passedEvent.data.ensembles.Other = ensembles;
            }
        }
    }

    bind() {
        if (this.frequencyOther) {
            this.passedEvent.data.frequency = this.frequencyOther;
        }

        delete this.passedEvent.data.clothing[this.clothingOther];
        delete this.passedEvent.data.shape[this.shapeOther];
        delete this.passedEvent.data.ensembles[this.ensemblesOther];
    }
}
