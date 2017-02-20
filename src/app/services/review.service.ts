import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class ReviewService {
  // private _apiUrl = 'https://private-91abd-node46.apiary-mock.com/';
  private _apiUrl = environment.API_URL;
  constructor(private http: Http) { }

  getAllResources(): Promise<any[]> {
    return this.http.
      get(this._apiUrl + 'resource')
        .toPromise()
        .then(x => x.json() as any[]);
  }
  getAllCongregations(): Promise<any[]> {
    return this.http.
      get(this._apiUrl + 'congregation')
        .toPromise()
        .then(x => x.json() as any[]);
  }
  getAllEvents(): Promise<any[]> {
    return this.http.
      get(this._apiUrl + 'event')
        .toPromise()
        .then(x => x.json() as any[]);
  }
  getAllOrganizations(): Promise<any[]> {
    return this.http.
      get(this._apiUrl + 'orgs')
        .toPromise()
        .then(x => x.json() as any[]);
  }
  getAllPersons(): Promise<any[]> {
    return this.http.
      get(this._apiUrl + 'person')
        .toPromise()
        .then(x => x.json() as any[]);
  }

  getResourceByID(id: number): Promise<any> {
    let pluck = x => (x && x.length) ? x[0] : undefined;
    return this.http
        .get(`${this._apiUrl}resource/${id}`)
        .toPromise()
        .then(x => x.json() as any);
    }

  getCongregationByID(id: number): Promise<any> {
    let pluck = x => (x && x.length) ? x[0] : undefined;
    return this.http
        .get(`${this._apiUrl}congregation/${id}`)
        .toPromise()
        .then(x => x.json() as any);
    }

  getEventByID(id: number): Promise<any> {
    let pluck = x => (x && x.length) ? x[0] : undefined;
    return this.http
        .get(`${this._apiUrl}event/${id}`)
        .toPromise()
        .then(x => x.json() as any);
    }

  getOrganizationByID(id: number): Promise<any> {
    let pluck = x => (x && x.length) ? x[0] : undefined;
    return this.http
        .get(`${this._apiUrl}organization/${id}`)
        .toPromise()
        .then(x => x.json() as any);
    }

  getPersonByID(id: number): Promise<any> {
    let pluck = x => (x && x.length) ? x[0] : undefined;
    return this.http
        .get(`${this._apiUrl}person/${id}`)
        .toPromise()
        .then(x => x.json() as any);
    }

    approveResource(id: number): Promise<any> {
    return this.http
      .put(`${this._apiUrl}resource/approved/1/${id}`, id)
			.toPromise();
    }

    deleteResource(id: number): Promise<any> {
    return this.http
        .delete(`${this._apiUrl}resource/delete/${id}`)
        .toPromise();
    }
}
