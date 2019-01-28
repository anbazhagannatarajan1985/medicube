import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL: string = 'http://localhost:3600';


  constructor(private httpClient: HttpClient) { }

  login(data: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(this.apiURL + '/auth', data).map(res => res).timeout(30000);
  }

  signup(data: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(this.apiURL + '/users', data).map(res => res).timeout(30000);
  }

}
