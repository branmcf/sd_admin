import { NgModule } from '@angular/core';

import { EntryNavComponent } from './entryNavbar/entryNavbar.component';
import { EntryNavModalComponent, NavDialog } from './entryNavModal/entryNavModal.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import 'hammerjs';


@NgModule ({
	id: 'shared',
	imports: [
		RouterModule,
		MaterialModule.forRoot(),
	],
	declarations: [
        EntryNavComponent,
		EntryNavModalComponent,
		NavDialog,
    ],
	entryComponents: [
		NavDialog,
	],
    exports: [
        EntryNavComponent,
		EntryNavModalComponent,
    ]
})

export class SharedModule {}
