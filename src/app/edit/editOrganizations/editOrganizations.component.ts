import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubmitService } from './../../services/submit.service';
import { ReviewService } from './../../services/review.service';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'hymn-edit-organization',
  templateUrl: './editOrganizations.html',
  styleUrls: ['./editOrganizations.scss']
})

export class EditOrganizationsComponent implements OnInit {
  id: number;
  approved: boolean;
  deleted: boolean;
  organization: any;

  countryOther: any;
  denomOther: any;
  geoOther: any;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    public dialog: MdDialog,) {
  }

 openDialog(organization) {
    let dialogRef = this.dialog.open(OrgDialog, {
      disableClose: false,
      width: '90%',
      height: '90%',
    });
    dialogRef.componentInstance.passedOrganization = organization;
    dialogRef.componentInstance.passedCountryOther = this.countryOther;
    dialogRef.componentInstance.passedDenomOther = this.denomOther;
    dialogRef.componentInstance.passedGeoOther = this.geoOther;
    this.createObject(organization);
    dialogRef.afterClosed().subscribe(result => {
        if (result === 'submitEdit') {
            this.submitEdit(organization);
        }
    });
  }

  createObject(organization) {
      const categories = {};
      const instruments = {};
      const shape = {};
      const clothing = {};
      const ethnicities = {};

      for(const i of organization.data.categories) {
        categories[i] = true;
      }
      for(const i of organization.data.instruments) {
        instruments[i] = true;
      }
      for(const i of organization.data.shape) {
        shape[i] = true;
      }
      for(const i of organization.data.clothing) {
        clothing[i] = true;
      }
      for(const i of organization.data.ethnicities) {
        ethnicities[i] = true;
      }
      
      organization.data.categories = categories;
      organization.data.instruments = instruments;
      organization.data.shape = shape;
      organization.data.clothing = clothing;
      organization.data.ethnicities = ethnicities;    
  }

  ngOnInit() {
    this.route.params.forEach(x => this.load(+x['id']));
  }

    private load(id){
        if(!id) {
            return;
        }

        var onload = (data) => {
            if (data) {
                this.id = id;
                this.organization = data;
            }
        };
        this.reviewService.getOrganizationByID(id).then(onload);
    }

    approve(id) {
        this.reviewService.approveOrganization(this.id);
        this.router.navigate(['/review/organizations']);
    }

    edit(id) {
        this.openDialog(this.organization);
    }

    submitEdit(organization) {
        if (this.countryOther) {
            this.organization.data.country = this.countryOther;
        }
        if (this.denomOther) {
            this.organization.data.denomination = this.denomOther;
        }
        if (this.geoOther) {
            this.organization.data.geographic_area = this.geoOther;
        }

        this.router.navigate(['/review/organizations'])
    }

    delete(id) {
        this.reviewService.deleteOrganization(this.id);
        this.router.navigate(['/review/organizations']);
    }
}

@Component({
  selector: 'organization-dialog',
  template:`
    <div>
        <form>
            <h1 md-dialog-title>Edit Organization</h1>
            <md-dialog-actions>

            <div class="form-group">
                <label for="orgName">
                    Organization Name
                </label>
                <input type="text" 
                class="full-width"
                id="orgName" 
                class="form-control" 
                [(ngModel)]="passedOrganization.data.name"
                name="orgName"/>
            </div>

            <br>

            <div class="form-group">
                <label>
                    Organization Website
                </label>
                <input type="url" 
                class="full-width"
                id="orgUrl" 
                class="form-control" 
                [(ngModel)]="passedOrganization.data.url"
                name="orgUrl"/>
            </div>   

            <br>

            <div class="form-group">
                <label for="orgParent">
                    Do you have a parent organization? (Are you officially housed or sponsored by a denomination, school, or other larger organization?)
                </label>
                <input type="text" 
                class="full-width"
                id="orgParent" 
                class="form-control"
                [(ngModel)]="passedOrganization.data.parent"
                name="orgParent"/>
            </div>  

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="orgDenomination">Are you related to or a part of a specific denomination or tradition?</legend>
                <md-radio-group [(ngModel)]="passedOrganization.data.denomination" name="orgDenomination" required>
                    <md-radio-button class="block-input" name="denomination" value="Ecumenical/Multi-Denominational">Ecumenical/Multi-Denominational</md-radio-button>
                    <md-radio-button class="block-input" name="denomination" value="Non-Denominational">Non-Denominational</md-radio-button>
                    <md-radio-button class="block-input" name="denomination" value="Roman Catholic">Roman Catholic</md-radio-button>
                    <md-radio-button class="block-input" name="denomination" value="Anglican/Episcopal">Anglican/Episcopal</md-radio-button>
                    <md-radio-button class="block-input" name="denomination" value="Lutheran">Lutheran</md-radio-button>
                    <md-radio-button class="block-input" name="denomination" value="Wesleyan (United Methodist, AME, etc...)">Wesleyan (United Methodist, AME, etc...)</md-radio-button>
                    <md-radio-button class="block-input" name="denomination" value="Reformed (Presbyterian, RCA, etc...)">Reformed (Presbyterian, RCA, etc...)</md-radio-button>
                    <md-radio-button class="block-input" name="denomination" value="Baptist/Free-Church">Baptist/Free-Church</md-radio-button>
                    <md-radio-button class="block-input" name="denomination" value="Pentecostal">Pentecostal</md-radio-button>
                    <md-radio-button class="block-input" name="denomination" value="other">
                        <label>
                            Other Denomination/Tradition
                        </label>
                        <input type="text"
                        class="full-width"
                        class="form-control"
                        [(ngModel)]="denomOther"
                        name=orgDenominationOther/>
                    </md-radio-button>
                </md-radio-group>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
                <label for="orgCountry">
                    What country are you located/headquartered?
                </label>
                <input type="text" 
                class="full-width"
                id="orgCountry" 
                class="form-control" 
                [(ngModel)]="passedOrganization.data.country"
                name="orgCountry"/>
            </div>   

            <br>

            <div class="form-group">
                <label for="orgState">
                    What state are you located/headquartered?
                </label>
                <input type="text" 
                class="full-width"
                id="orgState" 
                class="form-control" 
                [(ngModel)]="passedOrganization.data.state"
                name="orgState"/>
            </div> 

            <br>  

            <div class="form-group">
                <label for="orgCity">
                    What city are you located/headquartered?
                </label>
                <input type="text" 
                class="full-width"
                id="orgCity" 
                class="form-control" 
                [(ngModel)]="passedOrganization.data.city"
                name="orgCity"/>
            </div> 

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="orgGeogrpahics">What geographic area(s) do you serve?</legend>
                <md-radio-group [(ngModel)]="passedOrganization.data.geographic_area" name="orgGeographics" required>
                    <md-radio-button class="block-input" name="geographics" value="Our City Only" required>Our City Only</md-radio-button>
                    <md-radio-button class="block-input" name="geographics" value="Our Region/Synod/Presbytery/Dioceses Only">Our Region/Synod/Presbytery/Dioceses Only</md-radio-button>
                    <md-radio-button class="block-input" name="geographics" value="Our Region Only">Our Region Only</md-radio-button>
                    <md-radio-button class="block-input" name="geographics" value="U.S. Only">U.S. Only</md-radio-button>
                    <md-radio-button class="block-input" name="geographics" value="Canada Only">Canada Only</md-radio-button>
                    <md-radio-button class="block-input" name="geographics" value="Worldwide">Worldwide</md-radio-button>
                    <md-radio-button class="block-input" name="geographics" value="other">
                        <label>
                            Other Geographic Area
                        </label>
                        <input type="text" 
                        class="full-width"
                        [(ngModel)]="geoOther"
                        class="form-control"
                        name="orgGeogrphicsOther"/>
                    </md-radio-button>       
                </md-radio-group>
                </fieldset>
            </div>                           
                    
            <br>

            <div class="form-group">
                <fieldset>
                <legend for="orgResource">Are any of your resources free?</legend>
                    <md-radio-group [(ngModel)]="passedOrganization.data.is_org_free" name="orgResource" required>
                        <md-radio-button class="block-input" name="resource" value="Yes" required>Yes</md-radio-button>
                        <md-radio-button class="block-input" name="resource" value="No">No</md-radio-button>
                        <md-radio-button class="block-input" name="resource" value="We don't offer resources">We don't offer resources</md-radio-button>
                    </md-radio-group>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="orgConference">Are any of your events/conferences free?</legend>
                    <md-radio-group [(ngModel)]="passedOrganization.data.events_free" name="orgConference" required>
                        <md-radio-button class="block-input" name="conference" value="Yes" required>Yes</md-radio-button>
                        <md-radio-button class="block-input" name="conference" value="No">No</md-radio-button>
                        <md-radio-button class="block-input" name="conference" value="We don't offer events/conferences">We don't offer events/conferences</md-radio-button>
                    </md-radio-group>
                </fieldset>
            </div>      

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="orgMembership">Do you charge for membership?</legend>
                    <md-radio-group [(ngModel)]="passedOrganization.data.membership_free" name="orgMembership" required>
                        <md-radio-button class="block-input" name="membership" value="Yes" required>Yes</md-radio-button>
                        <md-radio-button class="block-input" name="membership" value="No">No</md-radio-button>
                        <md-radio-button class="block-input" name="membership" value="We don't offer memberships">We don't offer memberships</md-radio-button>
                    </md-radio-group>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
                <label for="orgMission">
                    What is the mission of your organization?
                </label>
                <textarea class="full-width"
                rows="4"
                cols="50"
                id="orgMission" 
                class="form-control"
                [(ngModel)]="passedOrganization.data.mission"
                name="orgMission">
                </textarea>
            </div>   

            <br>

            <div class="form-group">
                <label for="orgMethod">
                    How does your organization encourage, promote, or enliven congregational song?
                </label>
                <textarea class="full-width"
                rows="4"
                cols="50"
                id="orgMethod" 
                class="form-control"
                [(ngModel)]="passedOrganization.data.process"
                name="orgMethod">
                </textarea>
            </div>    

            <br>                                 

            <div class="form-group">
                <fieldset>
                <legend for="orgTypes">Which types of song/hymn(s) has your organization used or referenced over the past year?</legend>
                    <md-checkbox class="block-input" 
                        ng-true-value="true" 
                        ng-false-value="false"
                        [(ngModel)]="passedOrganization.data.categories['A hymn written prior to 1970']"
                        name="personTypeOne"
                        >A hymn written prior to 1970</md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personTypeTwo"
                        [(ngModel)]="passedOrganization.data.categories['Newly composed hymn (within the last 10 years)']"
                        >Newly composed hymn (within the last 10 years)</md-checkbox>       
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personTypeNine"
                        [(ngModel)]="passedOrganization.data.categories['A song written by our own artist/leader']"
                        >A song written by our own artist/leader</md-checkbox>      
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personTypeThree"
                        [(ngModel)]="passedOrganization.data.categories['Praise and Worship Song (CCM)']"
                        >Praise and Worship Song (CCM)</md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personTypeFour"
                        [(ngModel)]="passedOrganization.data.categories['Psalm Setting']"
                        >Psalm Setting</md-checkbox>         
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personTypeFive"
                        [(ngModel)]="passedOrganization.data.categories['Chant (Gregorian, Anglican, Pointed or Taize)']"
                        >Chant (Gregorian, Anglican, Pointed or Taize)</md-checkbox>          
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personTypeSix"
                        [(ngModel)]="passedOrganization.data.categories['Older hymn text set to a new contemporary tune (or re-tuned)']"
                        >Older hymn text set to a new contemporary tune (or 're-tuned')</md-checkbox>         
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personTypeSeven"
                        [(ngModel)]="passedOrganization.data.categories['Song from another country (or World Song)']"
                        >Song from another country (or 'World Song')</md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personTypeEight"
                        [(ngModel)]="passedOrganization.data.categories['Secular Song']"
                        >Secular Song</md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personTypeNine"
                        [(ngModel)]="passedOrganization.data.categories['Liturgical Music']"
                        >Liturgical Music</md-checkbox>
                    <md-checkbox class="block-input">  
                        <label for="orgCatOther">
                            Other Type
                        </label>                      
                        <input type="text" 
                        class="full-width"
                        id="orgCategoryOther" 
                        class="form-control" 
                        [(ngModel)]="passedOrganization.data.categories.Other"
                        name="orgCategoryOther"/>
                    </md-checkbox>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="orgInstruments">Which types of instruments does your organization use/reference?</legend>
                    <md-checkbox class="block-input" 
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personInstrumentOne"
                        [(ngModel)]="passedOrganization.data.instruments['Acappella']">
                        Acappella</md-checkbox>            
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personInstrumentTwo"
                        [(ngModel)]="passedOrganization.data.instruments['Organ']">
                        Organ</md-checkbox>          
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personInstrumentThree"
                        [(ngModel)]="passedOrganization.data.instruments['Piano']">
                        Piano</md-checkbox>           
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personInstrumentFour"
                        [(ngModel)]="passedOrganization.data.instruments['Guitar (not full band)']">
                        Guitar (not full band)</md-checkbox>         
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personInstrumentFive"
                        [(ngModel)]="passedOrganization.data.instruments['Band (guitar, bass, drums, etc...)']">
                        Band (guitar, bass, drums, etc...)</md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personInstrumentSix"
                        [(ngModel)]="passedOrganization.data.instruments['Orchestra/Wind Ensemble']">
                        Orchestra/Wind Ensemble</md-checkbox>          
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personInstrumentSeven"
                        [(ngModel)]="passedOrganization.data.instruments['Handbells']">
                        Handbells</md-checkbox>       
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personInstrumentEight"
                        [(ngModel)]="passedOrganization.data.instruments['Obligato Instruments (flute, clarinet, trumpet, etc...)']">
                        Obligato Instruments (flute, clarinet, trumpet, etc...)</md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personInstrumentNine"
                        [(ngModel)]="passedOrganization.data.instruments['Descants']">
                        Descants</md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true" 
                        ng-false-value="false"
                        name="personInstrumentTen"
                        [(ngModel)]="passedOrganization.data.instruments['Pre-Recorded Tracks/Accompaniments']">
                        Pre-Recorded Tracks/Accompaniments</md-checkbox>      
                    <md-checkbox class="block-input">
                        <label for="orgInstruOther">
                            Other Instruments
                        </label>                        
                        <input type="text"
                        class="full-width"
                        id="orgInstruments" 
                        class="form-control" 
                        [(ngModel)]="passedOrganization.data.instruments.Other"
                        name="orgInstruments"/>
                    </md-checkbox>
                </fieldset>
            </div>

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="orgShape">What worship patterns does your organization use/reference?</legend>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="shapeOne"
                    [(ngModel)]="passedOrganization.data.shape['5-Fold Pattern']">
                    5-Fold Pattern (Gathering, Word, Response, Table, Sending) - Roman Catholic Mass and similar structures
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="shapeTwo"
                    [(ngModel)]="passedOrganization.data.shape['4-Fold Pattern']">
                    4-Fold Pattern (Gathering, Word, Response, Sending) - Communion monthly or quarterly"
                </md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="shapeThree"
                    [(ngModel)]="passedOrganization.data.shape['2-Fold Pattern']">
                    2-Fold Pattern (Praise & Teaching) - Most Praise and Worship services
                </md-checkbox>
                <md-checkbox class="block-input">     
                    <label for="orgShapeOther">
                        Other Shape 
                    </label>                   
                    <input type="text" 
                    class="full-width"
                    id="congregationShape" 
                    class="form-control" 
                    [(ngModel)]="passedOrganization.data.shape.Other"
                    name="congregationShapeOther"/>
                </md-checkbox>
                </fieldset>
            </div> 

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="orgAttire">What do pastors/priests wear for the majority of the congregations you serve?</legend>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="congregationAttireFive"
                    [(ngModel)]="passedOrganization.data.clothing['Vestments']">
                    Vestments</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="congregationAttireSix"
                    [(ngModel)]="passedOrganization.data.clothing['Robes, with or without stoles']">
                    Robes, with or without stoles</md-checkbox>     
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="congregationAttireSeven"
                    [(ngModel)]="passedOrganization.data.clothing['Business Attire']">
                    Business Attire</md-checkbox>
                <md-checkbox class="block-input"
                    ng-true-value="true" 
                    ng-false-value="false"
                    name="congregationAttireEight"
                    [(ngModel)]="passedOrganization.data.clothing['Casual']">
                    Casual</md-checkbox>  
                <md-checkbox class="block-input">   
                    <label for="orgClothingOther">
                        Other Forms of Attire
                    </label>                     
                    <input type="text" 
                    class="full-width"
                    id="congregationAttire" 
                    class="form-control" 
                    [(ngModel)]="passedOrganization.data.clothing.Other"
                    name="congregationAttireOther"/>
                </md-checkbox>
                </fieldset>
            </div> 

            <br>

            <div class="form-group">
                <fieldset>
                <legend for="orgEthnicity">What ethnicities/races make up at least 20% of your organization?</legend>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="congregationEthnicityFive"
                        [(ngModel)]="passedOrganization.data.ethnicities['Asian - Chinese Language/Heritage']">
                        Asian - Chinese Language/Heritage
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="congregationEthnicityFive"
                        [(ngModel)]="passedOrganization.data.ethnicities['Asian - Indian']">
                        Asian - Indian
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="congregationEthnicityFive"
                        [(ngModel)]="passedOrganization.data.ethnicities['Asian - Southeast Asian Non-Chinese']">
                        Asian - Southeast Asian Non-Chinese
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="congregationEthnicityFive"
                        [(ngModel)]="passedOrganization.data.ethnicities['Asian - Korean']">
                        Asian - Korean
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="congregationEthnicityFive"
                        [(ngModel)]="passedOrganization.data.ethnicities['Asian - Japanese']">
                        Asian - Japanese
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="congregationEthnicitySix"
                        [(ngModel)]="passedOrganization.data.ethnicities['Black - African-American']">
                        Black - African-American
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="congregationEthnicitySix"
                        [(ngModel)]="passedOrganization.data.ethnicities['Black - Sub-Saharan African']">
                        Black - Sub-Saharan African
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="congregationEthnicityFour"
                        [(ngModel)]="passedOrganization.data.ethnicities['Hispanic/Latino/Spanish - Central/South American']">
                        Hispanic/Latino/Spanish - Central/South American
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="congregationEthnicityFour"
                        [(ngModel)]="passedOrganization.data.ethnicities['Hispanic/Latino/Spanish - Caribbean']">
                        Hispanic/Latino/Spanish - Caribbean
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="congregationEthnicitySeven"
                        [(ngModel)]="passedOrganization.data.ethnicities['Native American/Indigenous Peoples']">
                        Native American/Indigenous Peoples
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="congregationEthnicitySeven"
                        [(ngModel)]="passedOrganization.data.ethnicities['Native American/Pacific Islander']">
                        Native American/Pacific Islander
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="congregationEthnicitySeven"
                        [(ngModel)]="passedOrganization.data.ethnicities['North African/Middle Eastern']">
                        North African/Middle Eastern
                    </md-checkbox>
                    <md-checkbox class="block-input"
                        ng-true-value="true"
                        ng-false-value="false"
                        name="congregationEthnicityOne"
                        [(ngModel)]="passedOrganization.data.ethnicities['White']">
                        White
                    </md-checkbox>
                    <md-checkbox class="block-input">
                        <label for="orgEthOther">
                            Other Ethnicity
                        </label>
                        <input type="text" 
                        class="full-width"
                        id="orgEthnicityOther" 
                        class="form-control" 
                        name="orgEthnicityEight"
                        [(ngModel)]="passedOrganization.data.ethnicities.Other"/>
                    </md-checkbox>
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
  styleUrls: ['./editOrganizations.scss']
})

export class OrgDialog {
    passedOrganization: any;

    passedCountryOther: any;
    passedDenomOther: any;
    passedGeoOther: any;

    constructor(public dialogRef: MdDialogRef<OrgDialog>) {

    }
}
