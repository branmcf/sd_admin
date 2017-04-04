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
    });
  }

  createObject(event) {
      const shape = {};
      const clothing = {};
      const ensembles = {};

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
  }

    private load(id) {
        if (!id) {
            return;
        }

        var onload = (data) => {
            if (data) {
                this.id = id;
                this.event = data;
            }
        };
        this.reviewService.getEventByID(id).then(onload);
    }

    approve(id) {
        this.reviewService.approveEvent(this.id).then(() => {
            this.router.navigate(['/review/events']);
        });
    }

    edit(id) {

        this.openDialog(this.event)
    }

    submitEdit(event) {
        this.reviewService.editEvent(this.id, event);
        this.router.navigate(['/review/events']);
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
            <md-dialog-actions>

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
                    <md-radio-group [(ngModel)]="passedEvent.data.occurance" name="eventOccurance" required>
                        <md-radio-button class="block-input" name="occurance" value="Annual" required>Annual</md-radio-button>
                        <md-radio-button class="block-input" name="occurance" value="Every-Other-Year (once every 2 years)">Every-Other-Year (once every 2 years)</md-radio-button>
                        <md-radio-button class="block-input" name="occurance" value="One Time Only">One Time Only</md-radio-button>
                        <md-radio-button class="block-input" name="occurance" value="other">
                            <label for="eventOccur">
                                Other Occurance
                            </label>
                            <input type="text" 
                            class="full-width"
                            id="occuranceOther" 
                            class="form-control" 
                            [(ngModel)]="occuranceOther"
                            name="passedEvent.data.occurance"/>
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
                        <md-radio-button class="block-input" name="type" value="other">
                            <label for="eventTypeOther">
                                Other Type
                            </label>
                            <input type="text" 
                            class="full-width"
                            id="typeOther" 
                            class="form-control" 
                            [(ngModel)]="typeOther"
                            name="passedEvent.data.type"/>
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
            
            <div class="form-group">
                <label for="eventDate">Event Start Date</label>
                <input type="date" 
                id="eventStartDate" 
                class="form-control" 
                [(ngModel)]="passedEvent.data.event_start_date"
                name="eventStartDate"/>
            </div>

            <br>

            <div class="form-group">
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
                        <md-radio-button class="block-input" name="hymn_soc_member" value="Yes">Yes</md-radio-button>
                        <md-radio-button class="block-input" name="hymn_soc_member" value="No">No</md-radio-button>
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
                    <input type="text" 
                    class="full-width"
                    id="congregationShape" 
                    class="form-control" 
                    [(ngModel)]="passedEvent.data.shape.Other"
                    name="congregationShapeOther"/>
                </md-checkbox>
                </fieldset>
            </div> 

            <div class="form-group">
                <fieldset>
                <legend for="eventAttire">What does your pastor/priest wear when he/she preaches?</legend>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="congregationAttireFive"
                    [(ngModel)]="passedEvent.data.clothing['Vestments']">
                    Vestments</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="congregationAttireSix"
                    [(ngModel)]="passedEvent.data.clothing['Robes, with or without stoles']">
                    Robes, with or without stoles</md-checkbox>       
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="congregationAttireSeven"
                    [(ngModel)]="passedEvent.data.clothing['Business Attire']">
                    Business Attire</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="congregationAttireEight"
                    [(ngModel)]="passedEvent.data.clothing['Casual']">
                    Casual</md-checkbox>
                <md-checkbox class="block-input">     
                    <label>
                        Other Forms of Attire
                    </label>                   
                    <input type="text"
                    class="full-width"
                    id="congregationAttire" 
                    class="form-control" 
                    [(ngModel)]="passedEvent.data.clothing.Other"
                    name="congregationAttire"
                    name="congregationAttireOther"/>
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
              <button md-button md-dialog-close>
                Cancel
              </button>
            </md-card-actions>

            </md-dialog-actions>
        </form>  
    </div>    

    `
  ,
  styleUrls: ['./editEvents.scss']
})

export class EventDialog {
    passedEvent: any;

    occuranceOther: any;
    shapeOther: any;
    attireOther: any;
    typeOther: any;

    constructor(public dialogRef: MdDialogRef<EventDialog>) {

    }

    bind() {
        if (this.occuranceOther) {
            this.passedEvent.data.occurance = this.occuranceOther;
        }
        if (this.shapeOther) {
            this.passedEvent.data.shape = this.shapeOther;
        }
        if (this.attireOther) {
            this.passedEvent.data.clothing = this.attireOther;
        }
        if(this.typeOther) {
            this.passedEvent.data.type = this.typeOther;
        }
    }
}
