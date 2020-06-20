import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParameterCodec } from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CitiesService {
  service: string;
  code: number;

  constructor(
    private http: HttpClient
  ) {
    this.code = 1;
    this.service = 'areaCode'
  }

  settingParams(code) {
    let param;
  }

  getParam(){
    const param = {
      ServiceKey : 'xTIWihmkq%2BfoFqkInfWxmsUXV9Py9gV4fkUbleEuJ4SfYsUSneIkUEWSW1Geiuoa8oCXCVFDPBb57XIPaoGD0Q%3D%3D',
      MobileOS: 'ETC',
      MobileApp: 'AppTest',
      _type: 'json',
      numOfRows: 17
    };

    const params = Object.keys(param).reduce((acc, cur, i) => {
      if (param[cur]) {
        acc += `${cur}=${param[cur]}&`;
      }
      return acc;
    }, '?');
    return params.slice(0, -1);
  }
  
  getCitiesItems() {
    return this.http.get(`${environment.apiURL}${this.service}${this.getParam()}`).pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err) => {
          return throwError(err);
        })
    );
  }

  getAreaItems() {

  }
}