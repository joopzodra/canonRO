import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IEntry } from '../datatypes/i-entry';

@Injectable()
export class DataService {

  private dataUrl = 'assets/data/data.json';
  public entries: IEntry[];

  constructor(private http: Http) {

    this.http.get(this.dataUrl)
  }

  public getAllEntries(): Observable<IEntry[]> {

    return this.http.get(this.dataUrl)
      .map(res => {
        let jsonObject = res.json(); //convert json-string to json-object, see https://angular.io/docs/ts/latest/guide/server-communication.html#parse-to-json 
        this.entries = jsonObject;
        return jsonObject;
      })
      .catch(this.handleError);
  }

  public getEntry(id): IEntry {

    return this.entries.filter(entry => entry.id === id)[0];
  }

  private handleError(error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
