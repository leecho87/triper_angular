import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  service: string;

  constructor(
    private http: HttpClient
  ) {
    this.service = "areaBasedList"
  }

  setParams(data) {
    const params = {
      ServiceKey: environment.apiKey,
      MobileOS: 'ETC',
      MobileApp: 'AppTest',
      _type: 'json',
      ...data
    }
    return params;
  }

  getParam(data){
    const param = this.setParams(data)
    const params = Object.keys(param).reduce((acc, cur, i) => {
      if (param[cur]) {
        acc += `${cur}=${param[cur]}&`;
      }
      return acc;
    }, '?');
    return params.slice(0, -1);
  }

  getRestaurantItems(data?:any) {
    return this.http.get(`${environment.apiURL}${this.service}${this.getParam(data)}`).pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err) => {
          return throwError(err);
        })
    );
  }
}
