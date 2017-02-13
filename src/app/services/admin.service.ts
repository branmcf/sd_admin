import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { CanActivate } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class AdminService implements CanActivate {
    constructor(private http: Http) {}
    canActivate() {
        const userInfo = sessionStorage.getItem('userInfo');
        if (userInfo) {
            if (JSON.parse(userInfo).is_admin === 1) {
                return true;
            }
        }
        return false;
    }
}

