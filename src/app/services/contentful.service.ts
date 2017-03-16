import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import * as contentful from 'contentful';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

declare var process: any;

@Injectable()
export class ContentfulService {

    private client = contentful.createClient({
        space: environment.CONTENTFUL_SPACE,
        accessToken: environment.CONTENTFUL_TOKEN
    });
    constructor() {

    }

    getEntries() {
        this.client.getEntries()
        .then(function (entries) {
            return entries;
        });
    }

    // contentful definition of entry is used here

    getLandingPage() {
        return this.client.getEntry('5w7209ikAEy0ieiqkOW6so')
        .then((page) => {
            return page;
        });
    }

    getResourcesForm() {
        return Promise.resolve(this.client.getEntry('73N7PxAbegmGu2gwSqa46o')
            .then((form) => {
                return JSON.stringify(form);
            }));
    }

    getOrgsForm() {
        return Promise.resolve(this.client.getEntry('3LFm4Uq6lWEEM40qWkMKWG')
            .then((form) => {
                return JSON.stringify(form);
            }));
    }

    getPersonForm() {
        return Promise.resolve(this.client.getEntry('4Io2dsT11KQW0UmsIcSKOQ')
            .then((form) => {
                return JSON.stringify(form);
            }));
    }

    getCongregationForm() {
         return Promise.resolve(this.client.getEntry('36bnlQ1OKsYUIQoEkUWeYG')
            .then((form) => {
                return JSON.stringify(form);
            }));
    }

    getEventForm() {
        return Promise.resolve(this.client.getEntry('26KrDew6nyooYKWAeayeq4')
            .then((form) => {
                return JSON.stringify(form);
            }));
    }

    getResourceImages() {
        return Promise.resolve(this.client.getEntry('3wAUlZ2ny0GWMeekQq4UAI')
            .then((form) => {
                return JSON.stringify(form);
            }));
    }
}

