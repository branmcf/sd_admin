import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { CanActivate } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class QuizService implements CanActivate {
    private _apiUrl = environment.API_URL;
    constructor(private http: Http) { }

    canActivate() {
        const quizAnswers = sessionStorage.getItem('quizAnswers');
        if (quizAnswers) {
            return true;
        }
        return false;
    }


    submitQuizsResources(quizAnswers): Promise<any[]> {
        return this.http.
        post(this._apiUrl + 'quiz/resource/', quizAnswers)
            .toPromise()
            .then(x => x.json() as any[]);
    }
    submitQuizsCongregations(quizAnswers): Promise<any[]> {
        return this.http.
        post(this._apiUrl + 'quiz/congregation/', quizAnswers)
            .toPromise()
            .then(x => x.json() as any[]);
    }
    submitQuizsEvents(quizAnswers): Promise<any[]> {
        return this.http.
        post(this._apiUrl + 'quiz/event/', quizAnswers)
            .toPromise()
            .then(x => x.json() as any[]);
    }
    submitQuizsOrganizations(quizAnswers): Promise<any[]> {
        return this.http.
        post(this._apiUrl + 'quiz/orgs/', quizAnswers)
            .toPromise()
            .then(x => x.json() as any[]);
    }
    submitQuizsPersons(quizAnswers): Promise<any[]> {
        return this.http.
        post(this._apiUrl + 'quiz/person/', quizAnswers)
            .toPromise()
            .then(x => x.json() as any[]);
    }
}
