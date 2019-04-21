import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage'
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { delay, tap } from 'rxjs/operators'
import { user } from '../models/userModels';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public login: boolean = false
  private userDataSource = new Subject<any>();
  userData$ = this.userDataSource.asObservable();

  constructor(
    protected localstorage: LocalStorage
  ) { }


  setToken(token): Observable<any> {
    return new Observable(observer => {
      localStorage.setItem('authToken', token)
      observer.next(true);
      observer.complete()
    })
  }

  isLogin(): Observable<boolean> {
    let token = localStorage.getItem('authToken');
    if (token) {
      return of(true).pipe(
        delay(500),
        tap(val => this.login = false)
      )
    } else {
      return of(false).pipe(
        delay(500),
        tap(val => this.login = false)
      )
    }
  }

  deleteToken(): Observable<any> {
    return new Observable((observer) => {
      localStorage.clear();
      observer.next(true);
      observer.complete()
    })
  }

  getToken(): Observable<any> {
    return new Observable((observer) => {
      let token = localStorage.getItem('authToken');
      observer.next(token);
      observer.complete()
    })
  }

  setUserData(userlist: any): void {
    this.userDataSource.next(userlist);
  }
  get userData(): Subject<any> {
    return this.userDataSource;
  }
}
