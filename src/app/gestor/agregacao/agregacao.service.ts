import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import { Agregacao } from './agregacao';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AgregacaoService {

  private WebApiIt1url = 'https://sic20181106055047.azurewebsites.net/api/';
  constructor(private httpClient: HttpClient) { }
  getAgregacoes(): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'produtoproduto').pipe(
      map(this.extractData));
  }

  getAgregacaoId(idPai:number, idFilho:number): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'produtoproduto/' + idPai + "/" + idFilho).pipe(map(this.extractData));
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

  addagregacao(agregacao: Agregacao): Observable<Agregacao> {
    return this.httpClient.post<Agregacao>(this.WebApiIt1url + 'produtoproduto', agregacao, httpOptions);
  }

  deleteAgregacao (idPai :number, idFilho:number): Observable<Agregacao> {

    return this.httpClient.delete<Agregacao>(this.WebApiIt1url+'produtoproduto/' + idPai + "/" + idFilho, httpOptions);
  }

  updateAgregacao(idPai :number, idFilho:number, agregacao: Agregacao): Observable<any> {
    return this.httpClient.put(this.WebApiIt1url + 'produtoproduto/' + idPai + "/" + idFilho, agregacao, httpOptions);
  }
}
