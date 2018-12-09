import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

import { Produto } from './produto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private WebApiIt1url = 'https://sic20181106055047.azurewebsites.net/api/';
  constructor(private httpClient: HttpClient) { }
  
  getProdutos(): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'produto').pipe(
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

  getFilhos(id: number): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'produto/'+ id +'/Partes').pipe(
      map(this.extractData));
  }

  getPais(id: number): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'produto/'+ id +'/PartesEm').pipe(
      map(this.extractData));
  }

  addProduto(produto: Produto): Observable<Produto> {
    return this.httpClient.post<Produto>(this.WebApiIt1url + 'produto', produto, httpOptions);
  }

  updateProduto(id: number, produto: Produto) {
    alert("Foi editado um produto");
    return this.httpClient.put(this.WebApiIt1url + 'produto/' + id, produto, httpOptions);
  }

  deleteProduto (id :number): Observable<Produto> {
    return this.httpClient.delete<Produto>(this.WebApiIt1url+'produto/' + id, httpOptions);
  }

  getMateriais(idProduto: number): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'Produto/'+ idProduto +'/Materiais').pipe(  
    map(this.extractData));
}
}
