import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import { ProdutoMaterial } from './Produto-Material';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProdutoMaterialService {

  private WebApiIt1url = 'https://sic20181106055047.azurewebsites.net/api/';
  constructor(private httpClient: HttpClient) { }
  getProdutosMateriais(): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'ProdutoMaterial').pipe(
      map(this.extractData));
  }

  getProdutoMaterialId(idProduto :number, idMaterial:number): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'ProdutoMaterial/' + idProduto + "/" + idMaterial).pipe(map(this.extractData));
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

  addProdutoMaterial(produtoMaterial: ProdutoMaterial): Observable<ProdutoMaterial> {
    return this.httpClient.post<ProdutoMaterial>(this.WebApiIt1url + 'ProdutoMaterial', produtoMaterial, httpOptions);
  }

  deleteProdutoMaterial (idProduto :number, idMaterial:number): Observable<ProdutoMaterial> {

    return this.httpClient.delete<ProdutoMaterial>(this.WebApiIt1url+'ProdutoMaterial/' + idProduto + "/" + idMaterial, httpOptions);
  }

  updateProdutoMaterial(idProduto :number, idMaterial:number, produtoMaterial: ProdutoMaterial): Observable<any> {
    return this.httpClient.put(this.WebApiIt1url + 'ProdutoMaterial/' + idProduto + "/" + idMaterial, produtoMaterial, httpOptions);
  }
}
