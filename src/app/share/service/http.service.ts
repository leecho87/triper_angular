import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private http: HttpClient) {}

  setParams(data?) {
    const params = {
      ServiceKey: environment.apiKey,
      MobileOS: "ETC",
      MobileApp: "AppTest",
      _type: "json",
      numOfRows: 999,
      ...data,
    };
    return params;
  }

  getParam(data) {
    const param = this.setParams(data);
    const params = Object.keys(param).reduce((acc, cur, i) => {
      if (param[cur]) {
        acc += `${cur}=${param[cur]}&`;
      }
      return acc;
    }, "?");
    return params.slice(0, -1);
  }

  get(serviceLabel, data) {
    return this.http
      .get(`${environment.apiURL}${serviceLabel}${this.getParam(data)}`)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
