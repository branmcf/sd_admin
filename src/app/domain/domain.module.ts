import { NgModule, Injector } from '@angular/core';
import { HttpModule, XHRBackend, BrowserXhr, ResponseOptions,  XSRFStrategy } from '@angular/http';
import { InMemoryWebApiModule, InMemoryBackendService } from 'angular-in-memory-web-api';

@NgModule({
	id: 'domain',
	imports: [
		HttpModule
    ],
	providers: [
	]
})

export class DomainModule {}