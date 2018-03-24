import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestMethod, URLSearchParams, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/from';
import { Router } from '@angular/router/';



@Injectable()
export class AuthService {
    private url = 'http://localhost:3000/api/auth';
    private socket;
    constructor(private http: Http) {
    }
    play() {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:3000/api/auth/', JSON.stringify({}), options).map((res) => {
            return res;
        });
    }
}
