import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

import { ProdutoItem } from './item';
import { Acabamento } from 'src/app/gestor/acabamento/acabamento';
import { Material } from 'src/app/gestor/material/material';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private WebApiIt1url = 'https://sicencomendasit2.herokuapp.com/';
  //private WebApiIt1url = 'http://localhost:8080/';
  private WebApiIt1url2 = 'https://sic20181106055047.azurewebsites.net/api/';
  constructor(private httpClient: HttpClient) { }
  getItems(): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'ItemDeProduto').pipe(
      map(this.extractData));
  }
  getMateriais(idProduto: number): Observable<any> {
      return this.httpClient.get(this.WebApiIt1url2 + 'Produto/'+ idProduto +'/Materiais').pipe(  
      map(this.extractData));
  } 
  getAcabamentos(idMaterial: number): Observable<any> {
      return this.httpClient.get(this.WebApiIt1url2 + 'Material/' + idMaterial + '/Acabamentos').pipe(
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

  addItem(item: ProdutoItem): Observable<ProdutoItem> {
    alert("Foi Criado um Item");
    return this.httpClient.post<ProdutoItem>(this.WebApiIt1url + 'ItemDeProduto', item, httpOptions);
  }

  deleteItem(_id: string): Observable<ProdutoItem> {
    return this.httpClient.delete<ProdutoItem>(this.WebApiIt1url+'ItemDeProduto/' + _id, httpOptions);
  }

}

