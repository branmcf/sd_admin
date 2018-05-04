import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class ReviewService {
  // private _apiUrl = 'https://private-91abd-node46.apiary-mock.com/';
  private _apiUrl = environment.API_URL;
  constructor(private http: Http) { }

  getAllResources(param = ''): Promise<any[]> {
    return this.http.
      get(this._apiUrl + 'resource/' + param)
        .toPromise()
        .then(x => x.json() as any[]);
  }
  getAllResourcesCombined(param = ''): Promise<any[]> {
    console.log('CALLING ENDPOINT: ', this._apiUrl + 'all/' )
    return this.http.
      get(this._apiUrl + 'all/' + param)
        .toPromise()
        .then(x => x.json() as any[]);
  }
  getAllCongregations(param = ''): Promise<any[]> {
    return this.http.
      get(this._apiUrl + 'congregation/' + param)
        .toPromise()
        .then(x => x.json() as any[]);
  }
  getAllEvents(param = ''): Promise<any[]> {
    return this.http.
      get(this._apiUrl + 'event/' + param)
        .toPromise()
        .then(x => x.json() as any[]);
  }
  getAllOrganizations(param = ''): Promise<any[]> {
    return this.http.
      get(this._apiUrl + 'orgs/' + param)
        .toPromise()
        .then(x => x.json() as any[]);
  }
  getAllPersons(param = ''): Promise<any[]> {
    return this.http.
      get(this._apiUrl + 'person/' + param)
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
    .put(`${this._apiUrl}resource/update/${id}`, {'column': 'approved', 'value': 1})
    .toPromise();
  }

  deleteResource(id: number): Promise<any> {
    return this.http
      .delete(`${this._apiUrl}resource/${id}`, id)
      .toPromise();
  }
  approvePerson(id: number): Promise<any> {
    return this.http
    .put(`${this._apiUrl}person/update/${id}`, {'column': 'approved', 'value': 1})
    .toPromise();
  }

  deletePerson(id: number): Promise<any> {
    return this.http
      .delete(`${this._apiUrl}person/${id}`, id)
      .toPromise();
  }
  approveEvent(id: number): Promise<any> {
    return this.http
    .put(`${this._apiUrl}event/update/${id}`, {'column': 'approved', 'value': 1})
    .toPromise();
  }

  deleteEvent(id: number): Promise<any> {
    return this.http
      .delete(`${this._apiUrl}event/${id}`, id)
      .toPromise();
  }
  approveCongregation(id: number): Promise<any> {
    return this.http
    .put(`${this._apiUrl}congregation/update/${id}`, {'column': 'approved', 'value': 1})
    .toPromise();
  }

  deleteCongregation(id: number): Promise<any> {
    return this.http
      .delete(`${this._apiUrl}congregation/${id}`, id)
      .toPromise();
  }
  approveOrganization(id: number): Promise<any> {
    return this.http
    .put(`${this._apiUrl}orgs/update/${id}`, {'column': 'approved', 'value': 1})
    .toPromise();
  }

  deleteOrganization(id: number): Promise<any> {
    return this.http
      .delete(`${this._apiUrl}orgs/${id}`, id)
      .toPromise();
  }

  editResource(id: number, data: any): Promise<any> {
    return this.http
      .put(`${this._apiUrl}resource/${id}`, data)
      .toPromise();
  }

  editPerson(id: number, data: any): Promise<any> {
    return this.http
      .put(`${this._apiUrl}person/${id}`, data)
      .toPromise();
  }

  editOrganization(id: number, data: any): Promise<any> {
    return this.http
      .put(`${this._apiUrl}orgs/${id}`, data)
      .toPromise();
  }

  editEvent(id: number, data: any): Promise<any> {
    return this.http
      .put(`${this._apiUrl}event/${id}`, data)
      .toPromise();
  }

  editCongregation(id: number, data: any): Promise<any> {
    return this.http
      .put(`${this._apiUrl}congregation/${id}`, data)
      .toPromise();
  }

  addLike(id: number): Promise<any> {
    return this.http
      .post(`${this._apiUrl}resources/addLike/${id}`, id)
      .toPromise();
  }

  addView(id: number): Promise<any> {
    return this.http
      .post(`${this._apiUrl}resources/addView/${id}`, id)
      .toPromise();
  }

  addClick(id: number): Promise<any> {
    return this.http
      .post(`${this._apiUrl}resources/addClick/${id}`, id)
      .toPromise();
  }
}
