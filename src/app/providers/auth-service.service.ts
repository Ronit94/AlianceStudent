import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage'
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt'
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public login: boolean = false

  constructor(
    protected localstorage: LocalStorage,
    private jwtHelper: JwtHelperService
  ) { }


  setToken(token): Observable<any> {
    return new Observable(observer => {
      localStorage.setItem('authToken', token)
      observer.next(true);
      observer.error(new Error('Token error'));
      observer.complete()
    })
  }

  isLogin(): Observable<boolean> {
    let token = localStorage.getItem('authToken');
    if (token) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        return of(true).pipe(
          delay(500),
          tap(val => this.login = true))
      } else {
        return of(false).pipe(
          delay(500),
          tap(val => this.login = false)
        )
      }
    } else {
      return of(false).pipe(
        delay(500),
        tap(val => this.login = false)
      )
    }
  }
}
