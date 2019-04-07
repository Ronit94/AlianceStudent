import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Http, RequestOptions, Headers } from '@angular/http'
import { Observable, of } from 'rxjs';
import { map, tap, catchError, debounceTime } from 'rxjs/operators'
import { APIResponse } from '../models/APIModel'
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(
    private http: Http
  ) { }

  commonPostHttpService(Url: String, Obj: Object, operation: any): Observable<APIResponse> {

    let [headers, ApIUrl] = [new Headers({}), (environment.Server_URL + Url)]

    let requestOptions = new RequestOptions({ headers: headers })


    return this.http.post(ApIUrl, Obj, requestOptions).pipe(
      // catchError(this.handleError<any>(operation, {})),
      map(res => <APIResponse>res.json())
    )
  }


  commonGetHttpService(Url: String, operation: any): Observable<APIResponse> {
    let [headers, ApIUrl] = [new Headers({}), (environment.Server_URL + Url)]
    let requestOptions = new RequestOptions({ headers: headers })
    return this.http.get(ApIUrl, requestOptions).pipe(
      // catchError(this.handleError<any>(operation, {})),
      map(res => <APIResponse>res.json())
    )
  }

  commonPutHttpService(Url: String, obj: Object, operation: any): Observable<APIResponse> {
    let [headers, ApIUrl] = [new Headers({}), (environment.Server_URL + Url)]
    let requestOptions = new RequestOptions({ headers: headers })
    return this.http.put(ApIUrl, obj, requestOptions).pipe(
      // catchError(this.handleError<any>(operation, {})),
      map(res => <APIResponse>res.json())
    )
  }

  commonDeleteHttpService(Url: String, obj: Object, operation: any): Observable<APIResponse> {
    let [headers, ApIUrl] = [new Headers({}), (environment.Server_URL + Url)]
    let requestOptions = new RequestOptions({ headers: headers })
    return this.http.delete(ApIUrl, requestOptions).pipe(
      //catchError(this.handleError<any>(operation, {})),
      map(res => <APIResponse>res.json())
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
