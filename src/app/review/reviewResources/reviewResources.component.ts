import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'hymn-review-resources',
  templateUrl: './reviewResources.html',
})

export class ReviewResourcesComponent implements OnInit {
  resources: any[];
  id: number;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService) {
      this.reviewService.getAllResources()
        .then(x => this.resources = x)
        .then(x => console.log('RESOURCES ARE: ', this.resources))
        .catch(err => {});
  }

  ngOnInit() {}

  edit(id) {
    this.router.navigate(['/entry/review/resources', id]);
  }
}

@Component({
  selector: 'resource-dialog-new',
  template:`
  <div>
    <form>
      <h1 md-dialog-title>Edit Resource</h1>


        <div class="form-group">
                <label for="resourceTitle">
                    Title
                </label>
                <input type="text"
                id="resourceTitle" 
                class="form-control" 
                name="resourceTitle"
                [(ngModel)]="passedResource.title"/>

        </div>

        <br>

        <div class="form-group">
            <fieldset>
                <legend for="resourceType">Resource Type</legend>
                <md-radio-group [(ngModel)]="passedResource.type" name="radioType">
                    <md-radio-button class="block-input" name="type" value="Audio Track(s)"> Audio Track(s)</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Article(s)"> Article(s)</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Blog"> Blog</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Book"> Book</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Forum"> Forum</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Hymnal/Songbook"> Hymnal/Songbook</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Newsletter/E-News"> Newsletter/E-News</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Podcast"> Podcast</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Video/Visual(s)"> Video/Visual(s)</md-radio-button>
                    <md-radio-button class="block-input" name="type"> 
                        <label for="resourceTypeOther">
                            Other Type
                        </label>                                        
                        <input type="text"
                        *ngIf="passedResource.type != 'Audio Track(s)' && 'Article(s)' && 'Blog'
                            && 'Book' && 'Forum' && 'Hymnal/Songbook' && 'Newsletter/E-News'
                            && 'Podcast' && 'Video/Visual(s)'"
                        class="full-width"
                        id="resourceTitle" 
                        class="form-control" 
                        name="resourceTypeOther"
                        value="passedResource.type"
                        [(ngModel)]="passedResource.type"/>
                     </md-radio-button>
                </md-radio-group>
            </fieldset>
        </div>

        <br>

        <div class="panel-body">
            <div class="form-group">
                <label for="resourceUrl">
                    URL
                </label>
                <input type="url"
                id="resourceUrl" 
                class="form-control" 
                name="resourceUrl"
                [(ngModel)]="passedResource.url"/>
            </div>
        </div>

        <br>

        <div class="panel-body">
            <div class="form-group">
                <label for="resourceAuthor">
                    Author/Creator
                </label>
                <input type="text"
                id="resourceAuthor" 
                class="form-control" 
                name="resourceAuthor"
                [(ngModel)]="passedResource.author"/>
            </div>
        </div>

        <br>

        <div class="panel-body">
            <div class="form-group">
                <label for="resourceParent">    
                    Parent Organization or Source
                </label>
                <input type="text"
                id="resourceParent" 
                class="form-control" 
                name="resourceParent"
                [(ngModel)]="passedResource.parent"/>
            </div>
        </div>

        <br>

        <div class="panel-body">
            <div class="form-group">
                <label for="resourceDescription">
                    Description
                </label>
                <textarea 
                rows="4"
                cols="50"
                id="resourceDescription" 
                class="form-control" 
                name="resourceDescription"
                [(ngModel)]="passedResource.description"></textarea>
            </div>
        </div>

        <br>

         <div class="form-group">
            <fieldset>
                <legend for="resourceCategories">What categories does this resource fit into or relate to?</legend>
                <br>
                <md-checkbox class="block-input" 
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeOne"
                    [(ngModel)]="passedResource.categories['A hymn written prior to 1970']"
                    >A hymn written prior to 1970
                    </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeTwo"
                    [(ngModel)]="passedResource.categories['Newly composed hymn (within the last 10 years)']"
                    >Newly composed hymn (within the last 10 years)</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeNine"
                    [(ngModel)]="passedResource.categories['A song written by our own artist/leader']"
                    >A song written by our own artist/leader</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeThree"
                    checked="Praise and Worship Song (CCM)"
                    [(ngModel)]="passedResource.categories['Praise and Worship Song (CCM)']"
                    >Praise and Worship Song (CCM)</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeFour"
                    [(ngModel)]="passedResource.categories['Psalm Setting']"
                    >Psalm Setting</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeFive"
                    [(ngModel)]="passedResource.categories['Chant (Gregorian, Anglican, Pointed or Taize)']"
                    >Chant (Gregorian, Anglican, Pointed or Taize)</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeSix"
                    [(ngModel)]="passedResource.categories['Older hymn text set to a new contemporary tune (or re-tuned)']"
                    >Older hymn text set to a new contemporary tune (or 're-tuned')</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeSeven"
                    [(ngModel)]="passedResource.categories['World Song (a song not from the U.S. or Canada)']"
                    >Song from another country (or 'World Song')</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeEight"
                    [(ngModel)]="passedResource.categories['Secular Song']"
                    >Secular Song</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeNine"
                    [(ngModel)]="passedResource.categories['Liturgical Music']"
                    >Liturgical Music</md-checkbox>
                <md-checkbox class="block-input">    
                    <label for="resourceCategoriesOther">
                        Other Category
                    </label>                    
                    <input type="text"
                    class="full-width"
                    id="resourceCategories" 
                    class="form-control" 
                    [(ngModel)]="passedResource.categories.Other"
                    name="resourceCategoriesOther"/>
                </md-checkbox>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
                <fieldset>
                    <legend for="resourceTopic">Does this resource address any of these specific topics/concerns?</legend>
                    <md-checkbox class="block-input"
                        ng-true-value = "true"
                        ng-false-value = "false"
                        name="resourceTopicOne"
                        [(ngModel)]="passedResource.topics['Psalm Setting']">
                        Psalm Setting
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value = "true"
                        ng-false-value = "false"
                        name="resourceTopicTwo"
                        [(ngModel)]="passedResource.topics['Lectionary Based']">
                        Lectionary Based
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value = "true"
                        ng-false-value = "false"
                        name="resourceTopicThree"
                        [(ngModel)]="passedResource.topics['Social Justice']">
                        Social Justice
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value = "true"
                        ng-false-value = "false"
                        name="resourceTopicFour"
                        [(ngModel)]="passedResource.topics['Worship']">
                        Worship
                    </md-checkbox>
                    <md-checkbox class="block-input">     
                        <label for="resourceTopicOther">
                            Other Topic
                        </label>               
                        <input type="text"
                        class="full-width"
                        id="resourceTopic" 
                        class="form-control" 
                        [(ngModel)]="passedResource.topics.Other"
                        name="resourceTopic"/>
                    </md-checkbox>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
            <fieldset>
                <legend for="resourceAccompany">What kind of accompaniment does this resource address or lend itself toward?</legend>
                <md-checkbox class="block-input" 
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentOne"
                    [(ngModel)]="passedResource.accompaniment['Acappella']">
                    Acappella</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentTwo"
                    [(ngModel)]="passedResource.accompaniment['Organ']">
                    Organ</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentThree"
                    [(ngModel)]="passedResource.accompaniment['Piano']">
                    Piano</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentFour"
                    [(ngModel)]="passedResource.accompaniment['Guitar (not full band)']">
                    Guitar (not full band)</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentFive"
                    [(ngModel)]="passedResource.accompaniment['Band (guitar, bass, drums, etc...)']">
                    Band (guitar, bass, drums, etc...)</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentSix"
                    [(ngModel)]="passedResource.accompaniment['Orchestra/Wind Ensemble']">
                    Orchestra/Wind Ensemble</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentSeven"
                    [(ngModel)]="passedResource.accompaniment['Handbells']">
                    Handbells</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentEight"
                    [(ngModel)]="passedResource.accompaniment['Obligato Instruments (flute, clarinet, trumpet, etc...)']">
                    Obligato Instruments (flute, clarinet, trumpet, etc...)</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentNine"
                    [(ngModel)]="passedResource.accompaniment['Descants']">
                    Descants</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentTen"
                    [(ngModel)]="passedResource.accompaniment['Pre-Recorded Tracks/Accompaniments']">
                    Pre-Recorded Tracks/Accompaniments</md-checkbox>
                <md-checkbox class="block-input" name="other">      
                    <label for="resourceAccompanimentOther">
                        Other Accompaniment
                    </label>                 
                    <input type="text"
                    class="full-width"
                    id="resourceAccompaniment" 
                    class="form-control" 
                    [(ngModel)]="passedResource.accompaniment.Other"
                    name="resourceAccompaniment"/>
                </md-checkbox>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
            <fieldset>
                <legend for="resourceLang">What languages are represented in this resource?</legend>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceLangOne"
                    [(ngModel)]="passedResource.languages.English">
                    English
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceLangTwo"
                    [(ngModel)]="passedResource.languages.Spanish">
                    Spanish
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceLangThree"
                    [(ngModel)]="passedResource.languages.French">
                    French
                </md-checkbox>
                <md-checkbox class="block-input">
                    <label for="resourceLangOther">
                        Other Language
                    </label>
                    <input type="text"
                    class="full-width"
                    id="resourceLangFour" 
                    class="form-control" 
                    [(ngModel)]="passedResource.languages.Other"
                    name="resourceLang"/>
                </md-checkbox>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
            <fieldset>
                <legend for="resourceEnsemble">What types of ensembles are addressed in this resource?</legend>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="resourceEnsembleOne"
                    [(ngModel)]="passedResource.ensembles['Choir']">
                    Choir
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="resourceEnsembleTwo"
                    [(ngModel)]="passedResource.ensembles['Cantor']">
                    Cantor
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="resourceEnsembleThree"
                    [(ngModel)]="passedResource.ensembles['Song Enlivener']">
                    Song-Enlivener
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="resourceEnsembleFour"
                    [(ngModel)]="passedResource.ensembles['Lead Singer from Band (Solo)']">
                    Lead Singer from Band (Solo)
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="resourceEnsembleFive"
                    [(ngModel)]="passedResource.ensembles['Lead Singer from Band with Other Vocalists']">
                    Lead Singer from Band with Other Vocalists
                </md-checkbox>
                <md-checkbox class="block-input">
                    <label for="resourceEnsembleOther">
                        Other Ensemble
                    </label>
                    <input type="text"
                    class="full-width"
                    id="resourceEnsemble" 
                    class="form-control" 
                    [(ngModel)]="passedResource.ensembles.Other"
                    name="resourceEnsemble"/>
                </md-checkbox>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="resourceEthnicities">What ethnicities/races does this resource represent?</legend>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityOne"
                    [(ngModel)]="passedResource.ethnicities['Asian - Chinese Language/Heritage']">
                    Asian - Chinese Language/Heritage
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityTwo"
                    [(ngModel)]="passedResource.ethnicities['Asian - Indian']">
                    Asian - Indian
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityThree"
                    [(ngModel)]="passedResource.ethnicities['Asian - Southeast Asian Non-Chinese']">
                    Asian - Southeast Asian Non-Chinese
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityFour"
                    [(ngModel)]="passedResource.ethnicities['Asian - Korean']">
                    Asian - Korean
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityFive"
                    [(ngModel)]="passedResource.ethnicities['Asian - Japanese']">
                    Asian - Japanese
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicitySix"
                    [(ngModel)]="passedResource.ethnicities['Black - African-American']">
                    Black - African-American
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicitySeven"
                    [(ngModel)]="passedResource.ethnicities['Black - Sub-Saharan African']">
                    Black - Sub-Saharan African
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityEight"
                    [(ngModel)]="passedResource.ethnicities['Hispanic/Latino/Spanish - Central/South American']">
                    Hispanic/Latino/Spanish - Central/South American
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityNine"
                    [(ngModel)]="passedResource.ethnicities['Hispanic/Latino/Spanish - Caribbean']">
                    Hispanic/Latino/Spanish - Caribbean
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityTen"
                    [(ngModel)]="passedResource.ethnicities['Native American/Indigenous Peoples']">
                    Native American/Indigenous Peoples
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityEleven"
                    [(ngModel)]="passedResource.ethnicities['Native American/Pacific Islander']">
                    Native American/Pacific Islander
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityTwelve"
                    [(ngModel)]="passedResource.ethnicities['North African/Middle Eastern']">
                    North African/Middle Eastern
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityThirteen"
                    [(ngModel)]="passedResource.ethnicities['White']">
                    White
                </md-checkbox>
                <md-checkbox class="block-input">
                    <label for="resourceEthnicityOther">
                        Other Ethnicity
                    </label>
                    <input type="text"
                    class="full-width"
                    id="resourceEthnicityOther" 
                    class="form-control" 
                    name="resourceEthnicityEight"
                    [(ngModel)]="passedResource.ethnicities.Other"/>
                </md-checkbox>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="resourceIsInvolved">Is a Hymn Society member involved?</legend>
                <md-radio-group name="resourceIsInvolved" [(ngModel)]="passedResource.hymn_soc_member" required>
                    <md-radio-button class="block-input" value="true" required> Yes</md-radio-button>
                    <md-radio-button class="block-input" value="false"> No</md-radio-button>
                    <md-radio-button class="block-input" value="partially"> Unknown</md-radio-button>
                </md-radio-group>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="resourceFree">Is this resource free?</legend>
                <md-radio-group name="resourceFree" [(ngModel)]="passedResource.is_free" required>
                    <md-radio-button class="block-input" value="Yes" required> Yes</md-radio-button>
                    <md-radio-button class="block-input" value="We do not offer this"> Partially with paywall</md-radio-button>
                    <md-radio-button class="block-input" value="No"> No</md-radio-button>
                </md-radio-group>
                </fieldset>
            </div>

            <br>
            
            <div class="form-group">
            <fieldset>
                <legend for="resourcePractSchol">Is this resource practical or scholarly or both?</legend>
                <md-radio-group [(ngModel)]="passedResource.pract_schol" name="resourcePractSchol" required>
                    <md-radio-button 
                    class="block-input" value="Practical" required>
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
              <button md-raised-button color="primary" type="submit" (click)="bind(); dialogRef.close('submitEdit');">
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
  styleUrls: ['./reviewResources.scss']
})


export class ResourceDialogNew {  
  passedResource: any;

  resourceTypeOther: any;

  categoriesOther: any;
  topicsOther: any;
  accompanimentOther: any;
  languagesOther: any;
  ensemblesOther: any;
  ethnicitiesOther: any;

  constructor(public dialogRef: MdDialogRef<ResourceDialogNew>) {
  }

  ngOnInit() {
      this.checkOther();
  }

  checkOther() {
      for(const category of Object.keys(this.passedResource.categories)) {
            if(category !== 'Secular Song'
            && category !== 'Psalm Setting'
            && category !== 'Liturgical Music'
            && category !== 'A hymn written prior to 1970'
            && category !== 'Praise and Worship Song (CCM)'
            && category !== 'A song written by our own artist/leader'
            && category !== 'Chant (Gregorian, Anglican, Pointed or Taize)'
            && category !== 'Newly composed hymn (within the last 10 years)'
            && category !== 'World Song (a song not from the U.S. or Canada)'
            && category !== 'Older hymn text set to a new contemporary tune (or re-tuned)') {
                this.categoriesOther = category;
                this.passedResource.categories.Other = category;
            }
        }

        for(const topic of Object.keys(this.passedResource.topics)) {
            if(topic !== 'Vestments'
            && topic !== 'Robes, with or without stoles'
            && topic !== 'Business Attire'
            && topic !== 'Casual') {
                this.topicsOther = topic;
                this.passedResource.topics.Other = topic;
            }
        }

        for(const accompaniment of Object.keys(this.passedResource.accompaniment)) {
            if(accompaniment !== 'Organ'
            && accompaniment !== 'Piano'
            && accompaniment !== 'Descants'
            && accompaniment !== 'Acappella'
            && accompaniment !== 'Handbells'
            && accompaniment !== 'Guitar (not full band)'
            && accompaniment !== 'Orchestra/Wind Ensemble'
            && accompaniment !== 'Band (guitar, bass, drums, etc...)'
            && accompaniment !== 'Pre-Recorded Tracks/Accompaniments'
            && accompaniment !== 'Obligato Instruments (flute, clarinet, trumpet, etc...)') {
                this.accompanimentOther = accompaniment;
                this.passedResource.accompaniment.Other = accompaniment;
            }
        }

        for(const language of Object.keys(this.passedResource.languages)) {
            if(language !== 'English'
            && language !== 'Spanish'
            && language !== 'French') {
                this.languagesOther = language;
                this.passedResource.languages.Other = language;
            }
        }

        for(const ensembles of Object.keys(this.passedResource.ensembles)) {
            if(ensembles !== 'Choir'
            && ensembles !== 'Cantor'
            && ensembles !== 'Song Enlivener'
            && ensembles !== 'Lead Singer from Band (Solo)'
            && ensembles !== 'Lead Singer from Band with Other Vocalists') {
                this.ensemblesOther = ensembles;
                this.passedResource.ensembles.Other = ensembles;
            }
        }

        for(const ethnicity of Object.keys(this.passedResource.ethnicities)) {
            if(ethnicity !== 'White'
            && ethnicity !== 'Asian - Indian'
            && ethnicity !== 'Asian - Korean'
            && ethnicity !== 'Asian - Japanese'
            && ethnicity !== 'Black - African-American'
            && ethnicity !== 'Black - Sub-Saharan African'
            && ethnicity !== 'North African/Middle Eastern'
            && ethnicity !== 'Native American/Pacific Islander'
            && ethnicity !== 'Asian - Chinese Language/Heritage'
            && ethnicity !== 'Native American/Indigenous Peoples'
            && ethnicity !== 'Asian - Southeast Asian Non-Chinese'
            && ethnicity !== 'Hispanic/Latino/Spanish - Caribbean'
            && ethnicity !== 'Hispanic/Latino/Spanish - Central/South American') {
                this.ethnicitiesOther = ethnicity;
                this.passedResource.ethnicities.Other = ethnicity;
            }
        }
  }

  bind() {
      if(this.resourceTypeOther)
         this.passedResource.type = this.resourceTypeOther;

      delete this.passedResource.ensembles[this.ensemblesOther];
      delete this.passedResource.categories[this.categoriesOther];
      delete this.passedResource.languages[this.languagesOther];
      delete this.passedResource.ethnicities[this.ethnicitiesOther];
      delete this.passedResource.topics[this.topicsOther];
      delete this.passedResource.accompaniment[this.accompanimentOther];
  }
}
