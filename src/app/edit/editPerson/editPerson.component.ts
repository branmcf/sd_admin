import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'hymn-edit-person',
  templateUrl: './editPerson.html',
  styleUrls: ['./editPerson.scss']
})

export class EditPersonComponent implements OnInit {
  id: number;
  approved: boolean;
  deleted: boolean;
  person: any;
  submission: any;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    public dialog: MdDialog,) {
  }

  openDialog(person) {
    let dialogRef = this.dialog.open(PersonDialog, {
      disableClose: false,
      width: '90%',
      height: '90%',
    });
    dialogRef.componentInstance.passedPerson = person;
    this.createObject(person);
    dialogRef.afterClosed().subscribe(result => {
        if (result === 'submitEdit') {
            this.submitEdit(person);
        }
    });
  }

  createObject(person) {
      const topics = {};
      const languages = {};
      const ethnicities = {};
      const ensembles = {};
      const categories = {};
      const instruments = {};

      for(const i of person.data.topics) {
        topics[i] = true;
      }
      for(const i of person.data.languages) {
        languages[i] = true;
      }
      for(const i of person.data.ethnicities) {
        ethnicities[i] = true;
      }
      for(const i of person.data.ensembles) {
        ensembles[i] = true;
      }
      for(const i of person.data.categories) {
        categories[i] = true;
      }
      for(const i of person.data.instruments) {
        instruments[i] = true;
      }

      person.data.topics = topics;
      person.data.languages = languages;
      person.data.ethnicities = ethnicities;
      person.data.ensembles = ensembles;
      person.data.categories = categories;
      person.data.instruments = instruments;
  }

  ngOnInit() {
    this.route.params.forEach(x => this.load(+x['id']));

    this.submission = {};
  }

    private load(id) {
        if (!id) {
            return;
        }

        const onload = (data) => {
            if (data) {
                this.id = id;
                this.person = data;
            }
        };
        this.reviewService.getPersonByID(id).then(onload);
    }


    approve(id) {
        this.reviewService.approvePerson(this.id).then(() => {
            this.router.navigate(['/review/person']);
        });
    }

    edit() {
        this.openDialog(this.person);
    }

    submitEdit(person) {
        this.submission.data = person; 
        this.submission.user = person.user;

        this.reviewService.editPerson(this.id, this.submission).then(() => {
            this.router.navigate(['/review/person']);
        });
    }

    delete(id) {
        this.reviewService.deletePerson(this.id).then(()=> {
            this.router.navigate(['/review/person']);
        });
    }
}

@Component({
  selector: 'person-dialog',
  template:`
  <div>
    <form>
      <h1 md-dialog-title>Edit Person</h1>

        <div class="form-group">
            <label for="personFName">
                First Name
            </label>
            <input type="text" 
            class="full-width"
            id="personFname" 
            class="form-control" 
            [(ngModel)]="passedPerson.data.first_name"
            name="personFname"/>
        </div>

        <br>

        <div class="form-group">
            <label for="personLName">
                Last Name
            </label>
            <input type="text" 
            class="full-width"
            id="personLname" 
            class="form-control" 
            [(ngModel)]="passedPerson.data.last_name"
            name="personLname"/>
        </div>

        <br>

        <div class="form-group">
            <label for="personEmail">
                Email
            </label>
            <input type="text" 
            class="full-width"
            id="personEmail" 
            class="form-control" 
            [(ngModel)]="passedPerson.data.email"
            name="personEmail"/>
        </div>

        <br>

        <div class="form-group">
            <label for="personCity">
                City
            </label>
            <input type="text" 
            class="full-width"
            id="personCity" 
            class="form-control"
            [(ngModel)]="passedPerson.data.city" 
            name="personCity"/>
        </div>

        <br>

        <div class="form-group">
            <label for="personCountry">
                Country
            </label>
            <input type="text" 
            class="full-width"
            id="personCountry" 
            class="form-control"
            [(ngModel)]="passedPerson.data.country" 
            name="personCountry"/>
        </div> 

        <br>

        <div class="form-group">
            <label for="personState">
                State
            </label>
            <input type="text" 
            class="full-width"
            id="personState" 
            class="form-control"
            [(ngModel)]="passedPerson.data.state" 
            name="personState"/>
        </div> 

        <br>

        <div class="form-group">
            <label for="personUrl">
                Personal/Professional Website
            </label>
            <input type="url" 
            class="full-width"
            id="personUrl" 
            class="form-control"
            [(ngModel)]="passedPerson.data.url" 
            name="personUrl"/>
        </div> 

        <br>

        <div class="form-group">
            <label for="personFbook">
                Facebook Link
            </label>
            <input type="url" 
            class="full-width"
            id="personFbook" 
            class="form-control"
            [(ngModel)]="passedPerson.data.social_facebook" 
            name="personFbook"/>
        </div> 

        <br>

        <div class="form-group">
            <label for="personTwitter">
                Twitter Handle
            </label>
            <input type="url" 
            class="full-width"
            id="personTwitter" 
            class="form-control"
            [(ngModel)]="passedPerson.data.social_twitter" 
            name="personTwitter"/>
        </div> 

        <br>

        <div class="form-group">
            <label for="personOtherSocial">
                Other Social Media Connections
            </label>
            <input type="url" 
            class="full-width"
            id="personOtherSocial" 
            class="form-control"
            [(ngModel)]="passedPerson.data.social_other" 
            name="personOtherSocial"/>
        </div> 

        <br>

        <div class="form-group">
            <label for="personEmphasis">
                Main Topic/Emphasis
            </label>
            <input type="text" 
            class="full-width"
            id="personEmphasis" 
            class="form-control"
            [(ngModel)]="passedPerson.data.emphasis" 
            name="personEmphasis"/>
        </div>  

        <br>             

        <div class="form-group">
            <fieldset>
            <legend for="personMember">Are you a Hymn Society Member?</legend>
            <md-radio-group [(ngModel)]="passedPerson.data.hymn_soc_member" name="personMember" required>
                <md-radio-button class="block-input" name="isMember" value="true" required>Yes</md-radio-button>
                <md-radio-button class="block-input"  name="isMember" value="false">No</md-radio-button>
            </md-radio-group>
            </fieldset>
        </div>

        <br>

        <div class="form-group">
            <fieldset>
            <legend for="personTopics">Which Topics/Situations Are You Comfortable Working With?</legend>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personTopicOne"
                    [(ngModel)]="passedPerson.data.topics['Contemporary Song/Band']">
                Contemporary Song/Band
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personTopicTwo"
                    [(ngModel)]="passedPerson.data.topics['Traditional Hymnody']">
                Traditional Hymnody
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personTopicThree"
                    [(ngModel)]="passedPerson.data.topics['Musician/Pastor Relationship']">
                Musician/Pastor Relationship
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personTopicFour"
                    [(ngModel)]="passedPerson.data.topics['Cantoring']">
                Cantoring
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personTopicFive"
                    [(ngModel)]="passedPerson.data.topics['Song Enlivening']">
                Song Enlivening
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personTopicSix"
                    [(ngModel)]="passedPerson.data.topics['Keyboards']">
                Keyboards (piano/organ)
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personTopicSeven"
                    [(ngModel)]="passedPerson.data.topics['Worship Planning']">
                    Worship Planning
                </md-checkbox>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="resourceLang">What languages do you speak?</legend>
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="resourceLangOne"
                        [(ngModel)]="passedPerson.data.languages.English">
                        English
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="resourceLangTwo"
                        [(ngModel)]="passedPerson.data.languages.Spanish">
                        Spanish
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="resourceLangThree"
                        [(ngModel)]="passedPerson.data.languages.French">
                        French
                    </md-checkbox>
                    <md-checkbox class="block-input">
                        <label for="personLangOther">
                            Other Language
                        </label>
                        <input type="text" 
                        class="full-width"
                        id="resourceLangFour" 
                        class="form-control" 
                        [(ngModel)]="passedPerson.data.languages.Other"
                        name="resourceLang"/>
                    </md-checkbox>
                    </fieldset>
              </div>

              <br>

              <div class="form-group">
                <fieldset>
                <legend for="personEthnicity">Which ethnicities/races do you work with in at least 20% of your events?</legend>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityFive"
                    [(ngModel)]="passedPerson.data.ethnicities['Asian - Chinese Language/Heritage']">
                    Asian - Chinese Language/Heritage
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityFive"
                    [(ngModel)]="passedPerson.data.ethnicities['Asian - Indian']">
                    Asian - Indian
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityFive"
                    [(ngModel)]="passedPerson.data.ethnicities['Asian - Southeast Asian Non-Chinese']">
                    Asian - Southeast Asian Non-Chinese
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityFive"
                    [(ngModel)]="passedPerson.data.ethnicities['Asian - Korean']">
                    Asian - Korean
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityFive"
                    [(ngModel)]="passedPerson.data.ethnicities['Asian - Japanese']">
                    Asian - Japanese
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicitySix"
                    [(ngModel)]="passedPerson.data.ethnicities['Black - African-American']">
                    Black - African-American
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicitySix"
                    [(ngModel)]="passedPerson.data.ethnicities['Black - Sub-Saharan African']">
                    Black - Sub-Saharan African
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityFour"
                    [(ngModel)]="passedPerson.data.ethnicities['Hispanic/Latino/Spanish - Central/South American']">
                    Hispanic/Latino/Spanish - Central/South American
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityFour"
                    [(ngModel)]="passedPerson.data.ethnicities['Hispanic/Latino/Spanish - Caribbean']">
                    Hispanic/Latino/Spanish - Caribbean
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicitySeven"
                    [(ngModel)]="passedPerson.data.ethnicities['Native American/Indigenous Peoples']">
                    Native American/Indigenous Peoples
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicitySeven"
                    [(ngModel)]="passedPerson.data.ethnicities['Native American/Pacific Islander']">
                    Native American/Pacific Islander
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicitySeven"
                    [(ngModel)]="passedPerson.data.ethnicities['North African/Middle Eastern']">
                    North African/Middle Eastern
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityOne"
                    [(ngModel)]="passedPerson.data.ethnicities['White']">
                    White
                </md-checkbox>
                <md-checkbox class="block-input">
                    <label for="personEthnicityOther">
                        Other Ethnicity
                    </label>
                    <input type="text" 
                    class="full-width"
                    id="personEnsemble" 
                    class="form-control" 
                    name="personEthnicityEight"
                    [(ngModel)]="passedPerson.data.ethnicities.Other"/>
                </md-checkbox>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="personEnsemble">What types of ensembles are you comfortable working with?</legend>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="personEnsembleOne"
                    [(ngModel)]="passedPerson.data.ensembles['Choir']">
                    Choir
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="personEnsembleTwo"
                    [(ngModel)]="passedPerson.data.ensembles['Cantor']">
                    Cantor
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="personEnsembleThree"
                    [(ngModel)]="passedPerson.data.ensembles['Song Enlivener']">
                    Song-Enlivener
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="personEnsembleFour"
                    [(ngModel)]="passedPerson.data.ensembles['Lead Singer from Band (Solo)']">
                    Lead Singer from Band (Solo)
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="personEnsembleFive"
                    [(ngModel)]="passedPerson.data.ensembles['Lead Singer from Band with Other Vocalists']">
                    Lead Singer from Band with Other Vocalists
                </md-checkbox>
                <md-checkbox class="block-input" name="other">
                    <label>
                        Other Ensemble
                    </label>
                    <input type="text" 
                    class="full-width"
                    id="personTopic" 
                    class="form-control" 
                    [(ngModel)]="passedPerson.data.ensembles.Other"
                    name="personTopicOther"/>
                </md-checkbox>
                </fieldset>
            </div>

            <br>

            <div class="form-group" >
                <fieldset>
                <legend for="personTypes">Which types of song/hymn(s) has your congregation sung in the last 2 months?</legend>
                <md-checkbox class="block-input" 
                    ng-true-value="true" 
                    ng-false-value="false"
                    [(ngModel)]="passedPerson.data.categories['A hymn written prior to 1970']"
                    name="personTypeOne"
                    >A hymn written prior to 1970</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personTypeTwo"
                    [(ngModel)]="passedPerson.data.categories['Newly composed hymn (within the last 10 years)']"
                    >Newly composed hymn (within the last 10 years)</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personTypeNine"
                    [(ngModel)]="passedPerson.data.categories['A song written by our own artist/leader']"
                    >A song written by our own artist/leader</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personTypeThree"
                    [(ngModel)]="passedPerson.data.categories['Praise and Worship Song (CCM)']"
                    >Praise and Worship Song (CCM)</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personTypeFour"
                    [(ngModel)]="passedPerson.data.categories['Psalm Setting']"
                    >Psalm Setting</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personTypeFive"
                    [(ngModel)]="passedPerson.data.categories['Chant (Gregorian, Anglican, Pointed or Taize)']"
                    >Chant (Gregorian, Anglican, Pointed or Taize)</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personTypeSix"
                    [(ngModel)]="passedPerson.data.categories['Older hymn text set to a new contemporary tune (or re-tuned)']"
                    >Older hymn text set to a new contemporary tune (or 're-tuned')</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personTypeSeven"
                    [(ngModel)]="passedPerson.data.categories['Song from another country (or World Song)']"
                    >Song from another country (or 'World Song')</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personTypeEight"
                    [(ngModel)]="passedPerson.data.categories['Secular Song']"
                    >Secular Song</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personTypeNine"
                    [(ngModel)]="passedPerson.data.categories['Liturgical Music']"
                    >Liturgical Music</md-checkbox>
                <md-checkbox class="block-input">    
                    <label>
                        Other Category
                    </label>                    
                    <input type="text" 
                    class="full-width"
                    id="personCategoryOther" 
                    class="form-control" 
                    [(ngModel)]="passedPerson.data.categories.Other"
                    name="personCategoryOther"/>
                </md-checkbox>
                </fieldset>
            </div>

            <br>

            <div class="form-group" >
                <fieldset>
                <legend for="personInstruments">Which types of instruments does your congregation use during congregational singing?</legend>
                <md-checkbox class="block-input" 
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personInstrumentOne"
                    [(ngModel)]="passedPerson.data.instruments['Acappella']">
                    Acappella</md-checkbox>           
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personInstrumentTwo"
                    [(ngModel)]="passedPerson.data.instruments['Organ']">
                    Organ</md-checkbox>          
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personInstrumentThree"
                    [(ngModel)]="passedPerson.data.instruments['Piano']">
                    Piano</md-checkbox>        
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personInstrumentFour"
                    [(ngModel)]="passedPerson.data.instruments['Guitar (not full band)']">
                    Guitar (not full band)</md-checkbox>          
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personInstrumentFive"
                    [(ngModel)]="passedPerson.data.instruments['Band (guitar, bass, drums, etc...)']">
                    Band (guitar, bass, drums, etc...)</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personInstrumentSix"
                    [(ngModel)]="passedPerson.data.instruments['Orchestra/Wind Ensemble']">
                    Orchestra/Wind Ensemble</md-checkbox>           
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personInstrumentSeven"
                    [(ngModel)]="passedPerson.data.instruments['Handbells']">
                    Handbells</md-checkbox>          
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personInstrumentEight"
                    [(ngModel)]="passedPerson.data.instruments['Descants']">
                    Descants</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personInstrumentNine"
                    [(ngModel)]="passedPerson.data.instruments['Descants']">
                    Descants</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="personInstrumentTen"
                    [(ngModel)]="passedPerson.data.instruments['Pre-Recorded Tracks/Accompaniments']">
                    Pre-Recorded Tracks/Accompaniments</md-checkbox>          
                <md-checkbox class="block-input">  
                    <label>
                        Other Instrument    
                    </label>                  
                    <input type="text" class="full-width"
                    id="personInstruments" 
                    class="form-control" 
                    [(ngModel)]="passedPerson.data.instruments.Other"
                    name="personInstrumentOther"/>
                </md-checkbox>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="resourcePractSchol">Do you work with resources that are practical, scholarly, or both?</legend>
                <md-radio-group [(ngModel)]="passedPerson.data.pract_schol" name="personPractSchol" required>
                    <md-radio-button class="block-input" value="Practical" required> 
                        Practical</md-radio-button>
                    <md-radio-button class="block-input" value="Scholarly"> 
                        Scholarly</md-radio-button>
                    <md-radio-button class="block-input" value="Both"> 
                        Both</md-radio-button>
                </md-radio-group>
                </fieldset>
            </div>   

            <br>        
    
            <md-card-actions>
              <button md-raised-button color="primary" type="submit" (click)="dialogRef.close('submitEdit')">
                Submit
              </button>
              <button md-button md-dialog-close>
                Cancel
              </button>
            </md-card-actions>

        </form>  
    </div>
    `
  ,
  styleUrls: ['./editPerson.scss']
})

export class PersonDialog {  
  passedPerson: any;

  constructor(public dialogRef: MdDialogRef<PersonDialog>) {
  
  }

}
