import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AcabamentoService {

  private WebApiIt1url = 'https://sic20181106055047.azurewebsites.net/api/';
  constructor(private httpClient: HttpClient) { }
  getAcabamentos(): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'acabamento').pipe(
      map(this.extractData));
  }
  private extractData(res: Response) {
    return res || {};
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      console.error('An error occurred: ', err.error.message);
    }
    else {
      console.error(
        `Web Api returned code ${err.status}, ` + ` Response body was: ${err.error}`
      );
    }
    return Observable.throw(err);
  }
}
