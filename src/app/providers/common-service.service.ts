import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { map, tap, catchError, debounceTime } from 'rxjs/operators'
import { APIResponse } from '../models/APIModel'
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(
    private http: HttpClient
  ) { }

  commonPostHttpService(Url: String, Obj: Object, operation: any): Observable<APIResponse> {

    let ApIUrl = (environment.Server_URL + Url)
    return this.http.post(ApIUrl, Obj).pipe(
      catchError(this.handleError<any>(operation, {})),
      map(res => <APIResponse>res)
    )
  }


  commonGetHttpService(Url: String, operation: any): Observable<APIResponse> {
    let ApIUrl = (environment.Server_URL + Url)
    return this.http.get(ApIUrl).pipe(
      catchError(this.handleError<any>(operation, {})),
      map(res => <APIResponse>res)
    )
  }

  commonPutHttpService(Url: String, obj: Object, operation: any): Observable<APIResponse> {
    let ApIUrl = (environment.Server_URL + Url)
    return this.http.put(ApIUrl, obj).pipe(
      catchError(this.handleError<any>(operation, {})),
      map(res => <APIResponse>res)
    )
  }

  commonDeleteHttpService(Url: String, obj: Object, operation: any): Observable<APIResponse> {
    let ApIUrl = (environment.Server_URL + Url)
    return this.http.delete(ApIUrl).pipe(
      catchError(this.handleError<any>(operation, {})),
      map(res => <APIResponse>res)
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
