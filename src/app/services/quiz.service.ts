import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { CanActivate } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class QuizService implements CanActivate {
    private _apiUrl = environment.API_URL;
    // private _apiUrl = 'https://private-7e6d8-node46.apiary-mock.com/';

    constructor(private http: Http) { }

    canActivate() {
        const quizAnswers = sessionStorage.getItem('quizAnswers');
        if (quizAnswers) {
            return true;
        }
        return false;
    }


    submitQuizResources(quizAnswers): Promise<any[]> {
        return this.http.
        post(this._apiUrl + 'quiz/resource', quizAnswers)
            .toPromise()
            .then(x => x.json() as any[]);
    }
    submitQuizCongregations(quizAnswers): Promise<any[]> {
        return this.http.
        post(this._apiUrl + 'quiz/congregation', quizAnswers)
            .toPromise()
            .then(x => x.json() as any[]);
    }
    submitQuizEvents(quizAnswers): Promise<any[]> {
        return this.http.
        post(this._apiUrl + 'quiz/event', quizAnswers)
            .toPromise()
            .then(x => x.json() as any[]);
    }
    submitQuizOrganizations(quizAnswers): Promise<any[]> {
        return this.http.
        post(this._apiUrl + 'quiz/orgs', quizAnswers)
            .toPromise()
            .then(x => x.json() as any[]);
    }
    submitQuizPersons(quizAnswers): Promise<any[]> {
        return this.http.
        post(this._apiUrl + 'quiz/person', quizAnswers)
            .toPromise()
            .then(x => x.json() as any[]);
    }
}
