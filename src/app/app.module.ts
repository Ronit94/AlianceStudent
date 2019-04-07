import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router'
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonServiceService } from './providers/common-service.service'
import { httpInterceptorProviders } from './providers/interceptors/index'
import { JwtModule } from '@auth0/angular-jwt'

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadingBarRouterModule,
    NgxSpinnerModule,
    HttpClientModule,
    HttpModule,
    JwtModule.forRoot({}),
    BrowserAnimationsModule
  ],
  providers: [CommonServiceService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
