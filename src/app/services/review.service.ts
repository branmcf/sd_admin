import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class ReviewService {
    private _apiUrl = 'https://private-91abd-node46.apiary-mock.com/';
	// private _apiUrl = environment.API_URL;
    constructor(private http: Http) { }

    getAllResources() : Promise<any[]> {
		return this.http.
            get(this._apiUrl + 'resource')
		    .toPromise()
		    .then(x => x.json() as any[]);
	}	

    getResourceByID(id: number): Promise<any> {
        var pluck = x => (x && x.length) ? x[0] : undefined;
		return this.http
			.get(`${this._apiUrl}resource/${id}`)
			.toPromise()
            .then(x => x.json() as any);
    }
}
