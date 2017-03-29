import { Component, Input, Output, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'hymn-edit-resources',
  templateUrl: './editResources.html',
  styleUrls: ['./editResources.scss']
})

export class EditResourcesComponent implements OnInit {
  dialogRef: MdDialogRef<ResourceDialog>;
  id: number;
  approved: boolean;
  deleted: boolean;
  resource: any;

  resourceTypeOther: any;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    public dialog: MdDialog,) {
  }

   openDialog(resource) {
    let dialogRef = this.dialog.open(ResourceDialog, {
      disableClose: false,
      width: '90%',
      height: '90%',
    });
    dialogRef.componentInstance.passedResource = resource;
    dialogRef.componentInstance.resourceTypeOther = this.resourceTypeOther;
    this.createObject(resource);
    dialogRef.afterClosed().subscribe(result => {
        if (result === 'submitEdit') {
            this.submitEdit(resource, this.resourceTypeOther);
        }
    });
  }

  createObject(resource) {
      const categories = {};
      const topics = {};
      const accompaniment = {};
      const languages = {};
      const ensembles = {};
      const ethnicities = {};

      for(const i of resource.data.categories) {
        categories[i] = true;
      }
      for(const i of resource.data.topics) {
        topics[i] = true;
      }
      for(const i of resource.data.accompaniment) {
        accompaniment[i] = true;
      }
      for(const i of resource.data.languages) {
        languages[i] = true;
      }
      for(const i of resource.data.ensembles) {
        ensembles[i] = true;
      }
      for(const i of resource.data.ethnicities) {
        ethnicities[i] = true;
      }

      resource.data.categories = categories;
      resource.data.topics = topics;
      resource.data.accompaniment = accompaniment;
      resource.data.languages = languages;
      resource.data.ensembles = ensembles;
      resource.data.ethnicities = ethnicities;
  }

  ngOnInit() {
    this.route.params.forEach(x => this.load(+x['id']));
  }

    private load(id){
        if(!id) {
            return;
        }

        const onload = (data) => {
            if (data){
                this.id = id;
                data.categories = JSON.stringify(data);
                this.resource = data;
            }
        };
        this.reviewService.getResourceByID(id).then(onload);
    }


    approve(id) {
        this.reviewService.approveResource(this.id);
        this.router.navigate(['/review/resources']);
    }
    
    edit(id) {
        this.openDialog(this.resource);
    }

    submitEdit(resource, resourceTypeOther) {
        if (this.resourceTypeOther) {
            this.resource.data.type = this.resourceTypeOther;
        }

        this.router.navigate(['/review/resources']);
    }

    delete(id) {
        this.reviewService.deleteResource(this.id);
        this.router.navigate(['/review/resources']);
    }
}

@Component({
  selector: 'resource-dialog',
  template:`
  <div>
    <form>
      <h1 md-dialog-title>Edit Resource</h1>
      <md-dialog-actions>

        <div class="form-group">
            <div class="form-group">
                <label for="resourceTitle">
                    Title
                </label>
                <input type="text"
                id="resourceTitle" 
                class="form-control" 
                name="resourceTitle"
                [(ngModel)]="passedResource.data.title"/>
            </div>
        </div>

        <br>

        <div class="form-group">
            <fieldset>
                <legend for="resourceType">Resource Type</legend>
                <md-radio-group [(ngModel)]="passedResource.data.type" name="radioType">
                    <md-radio-button class="block-input" name="type" value="Audio Track(s)"> Audio Track(s)</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Article(s)"> Article(s)</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Blog"> Blog</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Book"> Book</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Forum"> Forum</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Hymnal/Songbook"> Hymnal/Songbook</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Newsletter/E-News"> Newsletter/E-News</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Podcast"> Podcast</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="Video/Visual(s)"> Video/Visual(s)</md-radio-button>
                    <md-radio-button class="block-input" name="type" value="other">                                         
                        <input type="text"
                        class="full-width"
                        id="resourceTitle" 
                        class="form-control" 
                        [(ngModel)]="resourceTypeOther"/>
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
                [(ngModel)]="passedResource.data.url"/>
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
                [(ngModel)]="passedResource.data.author"/>
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
                [(ngModel)]="passedResource.data.parent"/>
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
                [(ngModel)]="passedResource.data.description"></textarea>
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
                    [(ngModel)]="passedResource.data.categories['A hymn written prior to 1970']"
                    >A hymn written prior to 1970
                    </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeTwo"
                    [(ngModel)]="passedResource.data.categories['Newly composed hymn (within the last 10 years)']"
                    >Newly composed hymn (within the last 10 years)</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeNine"
                    [(ngModel)]="passedResource.data.categories['A song written by our own artist/leader']"
                    >A song written by our own artist/leader</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeThree"
                    checked="Praise and Worship Song (CCM)"
                    [(ngModel)]="passedResource.data.categories['Praise and Worship Song (CCM)']"
                    >Praise and Worship Song (CCM)</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeFour"
                    [(ngModel)]="passedResource.data.categories['Psalm Setting']"
                    >Psalm Setting</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeFive"
                    [(ngModel)]="passedResource.data.categories['Chant (Gregorian, Anglican, Pointed or Taize)']"
                    >Chant (Gregorian, Anglican, Pointed or Taize)</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeSix"
                    [(ngModel)]="passedResource.data.categories['Older hymn text set to a new contemporary tune (or re-tuned)']"
                    >Older hymn text set to a new contemporary tune (or 're-tuned')</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeSeven"
                    [(ngModel)]="passedResource.data.categories['Song from another country (or World Song)']"
                    >Song from another country (or 'World Song')</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeEight"
                    [(ngModel)]="passedResource.data.categories['Secular Song']"
                    >Secular Song</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceTypeNine"
                    [(ngModel)]="passedResource.data.categories['Liturgical Music']"
                    >Liturgical Music</md-checkbox>
                <md-checkbox class="block-input">    
                    <label for="resourceCategoriesOther">
                        Other Category
                    </label>                    
                    <input type="text"
                    class="full-width"
                    id="resourceCategories" 
                    class="form-control" 
                    [(ngModel)]="passedResource.data.categories.Other"
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
                        [(ngModel)]="passedResource.data.topics['Psalm Setting']">
                        Psalm Setting
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value = "true"
                        ng-false-value = "false"
                        name="resourceTopicTwo"
                        [(ngModel)]="passedResource.data.topics['Lectionary Based']">
                        Lectionary Based
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value = "true"
                        ng-false-value = "false"
                        name="resourceTopicThree"
                        [(ngModel)]="passedResource.data.topics['Social Justice']">
                        Social Justice
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value = "true"
                        ng-false-value = "false"
                        name="resourceTopicFour"
                        [(ngModel)]="passedResource.data.topics['Worship']">
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
                        [(ngModel)]="passedResource.data.topics.Other"
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
                    [(ngModel)]="passedResource.data.accompaniment['Acappella']">
                    Acappella</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentTwo"
                    [(ngModel)]="passedResource.data.accompaniment['Organ']">
                    Organ</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentThree"
                    [(ngModel)]="passedResource.data.accompaniment['Piano']">
                    Piano</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentFour"
                    [(ngModel)]="passedResource.data.accompaniment['Guitar (not full band)']">
                    Guitar (not full band)</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentFive"
                    [(ngModel)]="passedResource.data.accompaniment['Band (guitar, bass, drums, etc...)']">
                    Band (guitar, bass, drums, etc...)</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentSix"
                    [(ngModel)]="passedResource.data.accompaniment['Orchestra/Wind Ensemble']">
                    Orchestra/Wind Ensemble</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentSeven"
                    [(ngModel)]="passedResource.data.accompaniment['Handbells']">
                    Handbells</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentEight"
                    [(ngModel)]="passedResource.data.accompaniment['Obligato Instruments (flute, clarinet, trumpet, etc...)']">
                    Obligato Instruments (flute, clarinet, trumpet, etc...)</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentNine"
                    [(ngModel)]="passedResource.data.accompaniment['Descants']">
                    Descants</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceInstrumentTen"
                    [(ngModel)]="passedResource.data.accompaniment['Pre-Recorded Tracks/Accompaniments']">
                    Pre-Recorded Tracks/Accompaniments</md-checkbox>
                <md-checkbox class="block-input" name="other">      
                    <label for="resourceAccompanimentOther">
                        Other Accompaniment
                    </label>                 
                    <input type="text"
                    class="full-width"
                    id="resourceAccompaniment" 
                    class="form-control" 
                    [(ngModel)]="passedResource.data.accompaniment.Other"
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
                    [(ngModel)]="passedResource.data.languages.English">
                    English
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceLangTwo"
                    [(ngModel)]="passedResource.data.languages.Spanish">
                    Spanish
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="resourceLangThree"
                    [(ngModel)]="passedResource.data.languages.French">
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
                    [(ngModel)]="passedResource.data.languages.Other"
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
                    [(ngModel)]="passedResource.data.ensembles['Choir']">
                    Choir
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="resourceEnsembleTwo"
                    [(ngModel)]="passedResource.data.ensembles['Cantor']">
                    Cantor
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="resourceEnsembleThree"
                    [(ngModel)]="passedResource.data.ensembles['Song Enlivener']">
                    Song-Enlivener
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="resourceEnsembleFour"
                    [(ngModel)]="passedResource.data.ensembles['Lead Singer from Band (Solo)']">
                    Lead Singer from Band (Solo)
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="resourceEnsembleFive"
                    [(ngModel)]="passedResource.data.ensembles['Lead Singer from Band with Other Vocalists']">
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
                    [(ngModel)]="passedResource.data.ensembles.Other"
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
                    [(ngModel)]="passedResource.data.ethnicities['Asian - Chinese Language/Heritage']">
                    Asian - Chinese Language/Heritage
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityTwo"
                    [(ngModel)]="passedResource.data.ethnicities['Asian - Indian']">
                    Asian - Indian
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityThree"
                    [(ngModel)]="passedResource.data.ethnicities['Asian - Southeast Asian Non-Chinese']">
                    Asian - Southeast Asian Non-Chinese
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityFour"
                    [(ngModel)]="passedResource.data.ethnicities['Asian - Korean']">
                    Asian - Korean
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityFive"
                    [(ngModel)]="passedResource.data.ethnicities['Asian - Japanese']">
                    Asian - Japanese
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicitySix"
                    [(ngModel)]="passedResource.data.ethnicities['Black - African-American']">
                    Black - African-American
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicitySeven"
                    [(ngModel)]="passedResource.data.ethnicities['Black - Sub-Saharan African']">
                    Black - Sub-Saharan African
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityEight"
                    [(ngModel)]="passedResource.data.ethnicities['Hispanic/Latino/Spanish - Central/South American']">
                    Hispanic/Latino/Spanish - Central/South American
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityNine"
                    [(ngModel)]="passedResource.data.ethnicities['Hispanic/Latino/Spanish - Caribbean']">
                    Hispanic/Latino/Spanish - Caribbean
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityTen"
                    [(ngModel)]="passedResource.data.ethnicities['Native American/Indigenous Peoples']">
                    Native American/Indigenous Peoples
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityEleven"
                    [(ngModel)]="passedResource.data.ethnicities['Native American/Pacific Islander']">
                    Native American/Pacific Islander
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityTwelve"
                    [(ngModel)]="passedResource.data.ethnicities['North African/Middle Eastern']">
                    North African/Middle Eastern
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true"
                    ng-false-value="false"
                    name="congregationEthnicityThirteen"
                    [(ngModel)]="passedResource.data.ethnicities['White']">
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
                    [(ngModel)]="passedResource.data.ethnicities.Other"/>
                </md-checkbox>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="resourceIsInvolved">Is a Hymn Society member involved?</legend>
                <md-radio-group name="resourceIsInvolved" [(ngModel)]="passedResource.data.hymn_soc_member" required>
                    <md-radio-button class="block-input" value="true" required> Yes</md-radio-button>
                    <md-radio-button class="block-input" value="false"> No</md-radio-button>
                    <md-radio-button class="block-input" value="Unknown"> Unknown</md-radio-button>
                </md-radio-group>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="resourceFree">Is this resource free?</legend>
                <md-radio-group name="resourceFree" [(ngModel)]="passedResource.data.is_free" required>
                    <md-radio-button class="block-input" value="true" required> Yes</md-radio-button>
                    <md-radio-button class="block-input" value="Partially"> Partially with paywall</md-radio-button>
                    <md-radio-button class="block-input" value="false"> No</md-radio-button>
                </md-radio-group>
                </fieldset>
            </div>

            <br>
            
            <div class="form-group">
            <fieldset>
                <legend for="resourcePractSchol">Is this resource practical or scholarly or both?</legend>
                <md-radio-group [(ngModel)]="passedResource.data.pract_schol" name="resourcePractSchol" required>
                    <md-radio-button 
                    class="block-input" value="Practical" required>
                    Practical</md-radio-button>
                    <md-radio-button class="block-input" value="Scholarly"> 
                        Scholarly</md-radio-button>
                    <md-radio-button class="block-input" value="both"> 
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

      </md-dialog-actions>
      </form>
    </div>
  `
  ,
  styleUrls: ['./editResources.scss']
})

export class ResourceDialog {  
  passedResource: any;

  resourceTypeOther: any;

  constructor(public dialogRef: MdDialogRef<ResourceDialog>) {

  }

}
