import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { NgxSpinnerService } from 'ngx-spinner'
@Injectable()
export class HttpServicesInterceptor implements HttpInterceptor {
    constructor(
        public spinnerService: NgxSpinnerService
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.show()
        console.log('enter')
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.spinnerService.hide()
            }
        },
            (err: any) => {
                this.spinnerService.hide()
            }));
    }
}