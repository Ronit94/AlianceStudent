import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
registerLocaleData(en);


import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './exception/page-not-found/page-not-found.component';
import { ErrorPageComponent } from './exception/error-page/error-page.component';
import { AuthComponent } from './auth/auth.component';
import { ExceptionComponent } from './exception/exception.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, PageNotFoundComponent, ErrorPageComponent, AuthComponent, ExceptionComponent, DashboardComponent, ProfileComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule
  ],
  providers: []
})
export class PagesModule { }
