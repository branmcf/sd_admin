import { Component, OnInit, Injectable, EventEmitter, Input, ViewContainerRef} from '@angular/core';
import { Route, Router, RoutesRecognized, ActivatedRoute, Params } from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';


@Component({
	// tslint:disable-next-line:component-selector-prefix
	selector: 'entry-nav-modal',
	templateUrl: './entryNavModal.html',
})

export class EntryNavModalComponent {
	dialogRef: MdDialogRef<NavDialog>;
	constructor(public dialog: MdDialog) {}

	openDialog() {
    this.dialogRef = this.dialog.open(NavDialog, {
      disableClose: false,
      width: '50%',
      height: '50%',
      position: {left: '25%'},
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogRef = null;
    });
  }
}

@Component({
  selector: 'nav-dialog',
  template: `
    <div class="nav-dialog">
      <h1 md-dialog-title>What resources are you entering?</h1>

      <md-dialog-content>
          <ul class="nav-sidebar">
              <li><button md-dialog-close><a routerLink="/entry/resources">Resources</a></button></li>
              <li><button md-dialog-close><a routerLink="/entry/person">Person</a></button></li>
              <li><button md-dialog-close><a routerLink="/entry/congregations">Congregation</a></button></li>
              <li><button md-dialog-close><a routerLink="/entry/orgs">Organization</a></button></li>
              <li><button md-dialog-close><a routerLink="/entry/events">Event</a></button></li>
          </ul>
      </md-dialog-content>
      <md-dialog-actions>
          <button md-dialog-close>Cancel</button>
      </md-dialog-actions>
    </div>
  `
})
export class NavDialog {
  constructor(public dialogRef: MdDialogRef<NavDialog>) { }
}
