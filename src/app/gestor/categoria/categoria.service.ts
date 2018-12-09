import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http'

import { Categoria } from './categoria';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private WebApiIt1url = 'https://sic20181106055047.azurewebsites.net/api/';
  constructor(
    private httpClient: HttpClient) { }
  getCategorias(): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'categoria').pipe(
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

  addCategoria(categoria: Categoria): Observable<Categoria> {
    return this.httpClient.post<Categoria>(this.WebApiIt1url + 'categoria', categoria, httpOptions);
  }

  updateCategoria(id: number, categoria: Categoria): Observable<any> {
    alert("Foi editada uma Categoria");
    return this.httpClient.put(this.WebApiIt1url + 'categoria/' + id, categoria, httpOptions);
  }

}