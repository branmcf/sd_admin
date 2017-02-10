import { Component, OnInit, Injectable, EventEmitter, Input } from '@angular/core';
import { Route, Router, RoutesRecognized, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'entry-nav',
  templateUrl: './entryNavbar.html',
})

export class EntryNavComponent {
  dialogRef: MdDialogRef<NavConfirm>;
  constructor(public dialog: MdDialog, private router: Router, private route: ActivatedRoute) {}
  openDialog(link: string) {
    if (this.router.url === '/entry/welcome') {
      this.router.navigate([link]);
    } else {
      this.dialogRef = this.dialog.open(NavConfirm, {
        disableClose: false,
        width: '30%',
        height: '30%',
        position: {left: '40%'},
      });

      this.dialogRef.componentInstance.link = link;

      this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate([result]);
      }
        this.dialogRef = null;
      });
    }
  }
}


@Component({
  selector: 'nav-confirm',
  template: `
    <div class="nav-dialog">
      <h1 md-dialog-title>Are you sure you want to leave?</h1>
      <md-dialog-content>You will lose your work!</md-dialog-content>
      <md-dialog-actions>
          <button md-button md-dialog-close>Cancel</button>
		  <button md-button color="primary" (click)="dialogRef.close(link)">Yes</button>
      </md-dialog-actions>
    </div>
  `
})
export class NavConfirm {
  link: string;
  constructor(public dialogRef: MdDialogRef<NavConfirm>) { }
}
