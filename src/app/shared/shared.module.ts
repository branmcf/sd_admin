import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryNavComponent, NavConfirm } from './entryNavbar/entryNavbar.component';
import { EntryNavModalComponent, NavDialog } from './entryNavModal/entryNavModal.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import 'hammerjs';


@NgModule ({
	id: 'shared',
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule.forRoot(),
	],
	declarations: [
        EntryNavComponent,
		EntryNavModalComponent,
		NavDialog,
		NavConfirm
    ],
	entryComponents: [
		NavDialog,
		NavConfirm
	],
    exports: [
        EntryNavComponent,
		EntryNavModalComponent,
    ]
})

export class SharedModule {}
