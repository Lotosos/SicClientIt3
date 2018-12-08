import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private WebApiIt1url = 'https://sic20181106055047.azurewebsites.net/api/';
  constructor(private httpClient: HttpClient) { }
  getMateriais(): Observable<any> {
    return this.httpClient.get(this.WebApiIt1url + 'material').pipe(
      map(this.extractData));
  }
  private extractData(res: Response) {
    return res || {};
  }
}