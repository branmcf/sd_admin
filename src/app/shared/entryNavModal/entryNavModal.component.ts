import { Component, OnInit, Injectable, EventEmitter, Input, ViewContainerRef} from '@angular/core';
import { Route, Router, RoutesRecognized, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';


@Component({
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
      height: '60%',
      position: {left: '25%'},
    });

    this.dialogRef.afterClosed().subscribe(result => {
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
              <li><a md-button md-dialog-close routerLink="/entry/resources">Resources</a></li>
              <li><a md-button md-dialog-close routerLink="/entry/person">Person</a></li>
              <li><a md-button md-dialog-close routerLink="/entry/congregations">Congregation</a></li>
              <li><a md-button md-dialog-close routerLink="/entry/orgs">Organization</a></li>
              <li><a md-button md-dialog-close routerLink="/entry/events">Event</a></li>
          </ul>
      </md-dialog-content>
      <md-dialog-actions>
          <button md-button md-dialog-close>Cancel</button>
      </md-dialog-actions>
    </div>
  `
})
export class NavDialog {
  constructor(public dialogRef: MdDialogRef<NavDialog>) { }
}
