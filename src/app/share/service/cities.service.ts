import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  service: string =  'areaCode';
  constructor(
    private http: HttpClient
  ) { 
    console.log(environment.apiKey);
    
  } 

  setParam(){
    return {
      'ServiceKey' : this.setDecodeKey('Q6I%2FZ%2BtN8n3yVqpZvlgFIP8b9xAx8Sv2KgwT3lcFGRU3RJDZ5V09bOOtfLXTC9PW0kg2Ju9fGOWlO4BMrt2LMw%3D%3D'),
      'MobileOS': 'ETC',
      'MobileApp': 'AppTest',
      '_type': 'json'
    }
  }

  setDecodeKey(key:string){
    return decodeURIComponent(key);
  }

  getCitiesItems() {
    console.log(this.setParam());
    
    return this.http.get(`${environment.apiURL}`, {
      params: this.setParam()
      }).pipe(
        map((res: any) => {
          return res.data;
        }),
        catchError((err) => {
          return throwError(err);
        })
    );
  }
}


/**
 * 
 * 
 * https://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode?ServiceKey=Q6I%2FZ%2BtN8n3yVqpZvlgFIP8b9xAx8Sv2KgwT3lcFGRU3RJDZ5V09bOOtfLXTC9PW0kg2Ju9fGOWlO4BMrt2LMw%3D%3D&MobileOS=ETC&MobileApp=AppTest&_type=json
 * https://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode?ServiceKey=Q6I%252FZ%252BtN8n3yVqpZvlgFIP8b9xAx8Sv2KgwT3lcFGRU3RJDZ5V09bOOtfLXTC9PW0kg2Ju9fGOWlO4BMrt2LMw%253D%253D&MobileOS=ETC&MobileApp=AppTest&_type=json
 */
