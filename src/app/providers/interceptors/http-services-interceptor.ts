import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { NgxSpinnerService } from 'ngx-spinner'
@Injectable()
export class HttpServicesInterceptor implements HttpInterceptor {
    constructor(
        public spinnerService: NgxSpinnerService,
        private router: Router
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.show()
        if (localStorage.getItem('authToken')) {
            request = request.clone({
                headers: request.headers.set('access-token', localStorage.getItem('authToken'))
            })
        }
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if (event.body.statusCode === 403) {
                    localStorage.clear();
                    this.router.navigate(['pages/auth/login'])
                } else {
                    this.spinnerService.hide()
                }
            }
        },
            (err: any) => {
                this.spinnerService.hide()
            }));
    }
}