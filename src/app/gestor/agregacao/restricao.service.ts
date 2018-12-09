import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import { Restricao } from './restricao';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RestricaoService {

  private WebApiIt1url = 'https://sic20181106055047.azurewebsites.net/api/';
  constructor(private httpClient: HttpClient) { }
  getRestricoes(): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'restricao').pipe(
      map(this.extractData));
  }

  getRestricaoId(idPai:number, idFilho:number): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'restricao/' + idPai + "/" + idFilho).pipe(map(this.extractData));
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

  addRestricao(Restricao: Restricao): Observable<Restricao> {
    return this.httpClient.post<Restricao>(this.WebApiIt1url + 'restricao', Restricao, httpOptions);
  }

  deleteRestricao (id :number): Observable<Restricao> {

    return this.httpClient.delete<Restricao>(this.WebApiIt1url+'restricao/' + id, httpOptions);
  }

  updateRestricao(id :number, Restricao: Restricao): Observable<any> {
    return this.httpClient.put(this.WebApiIt1url + 'restricao/' + id, Restricao, httpOptions);
  }
}
