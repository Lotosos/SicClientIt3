import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http'

import { Material } from './material';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private WebApiIt1url = 'https://sic20181106055047.azurewebsites.net/api/';
  constructor(
    private httpClient: HttpClient) { }
  getMateriais(): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'material').pipe(
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

  addMaterial(material: Material): Observable<Material> {
    return this.httpClient.post<Material>(this.WebApiIt1url + 'material', material, httpOptions);
  }

  updateMaterial(id: number, material: Material): Observable<any> {
    alert("Foi editado um Material");
    return this.httpClient.put(this.WebApiIt1url + 'material' + id, material, httpOptions);
  }

}