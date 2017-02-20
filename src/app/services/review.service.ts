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
        .get(`${this._apiUrl}orgs/${id}`)
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
      .put(`${this._apiUrl}resource/is_active/0/${id}`, id)
      .toPromise();
  }
  approvePerson(id: number): Promise<any> {
    return this.http
    .put(`${this._apiUrl}person/approved/1/${id}`, id)
    .toPromise();
  }

  deletePerson(id: number): Promise<any> {
    return this.http
      .put(`${this._apiUrl}person/is_active/0/${id}`, id)
      .toPromise();
  }
  approveEvent(id: number): Promise<any> {
    return this.http
    .put(`${this._apiUrl}event/approved/1/${id}`, id)
    .toPromise();
  }

  deleteEvent(id: number): Promise<any> {
    return this.http
      .put(`${this._apiUrl}event/is_active/0/${id}`, id)
      .toPromise();
  }
  approveCongregation(id: number): Promise<any> {
    return this.http
    .put(`${this._apiUrl}congregation/approved/1/${id}`, id)
    .toPromise();
  }

  deleteCongregation(id: number): Promise<any> {
    return this.http
      .put(`${this._apiUrl}congregation/is_active/0/${id}`, id)
      .toPromise();
  }
  approveOrganization(id: number): Promise<any> {
    return this.http
    .put(`${this._apiUrl}orgs/approved/1/${id}`, id)
    .toPromise();
  }

  deleteOrganization(id: number): Promise<any> {
    return this.http
      .put(`${this._apiUrl}orgs/is_active/0/${id}`, id)
      .toPromise();
  }
}
