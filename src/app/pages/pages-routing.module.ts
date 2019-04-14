import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ExceptionComponent } from './exception/exception.component';
import { ErrorPageComponent } from './exception/error-page/error-page.component';
import { PageNotFoundComponent } from './exception/page-not-found/page-not-found.component'

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component'

import { CanActivateGuard } from '../providers/guard/auth.guard'
import { CanActivate } from '@angular/router/src/utils/preactivation';


const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        canActivate: [CanActivateGuard],
        component: LoginComponent
      }, {
        path: 'register',
        // canActivate: [CanActivateGuard],
        component: RegisterComponent
      }, {
        path: 'forgot-password',
        //canActivate: [CanActivateGuard],
        component: ForgotPasswordComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [CanActivateGuard]
      }
    ]
  },
  {
    path: 'exception',
    component: ExceptionComponent,
    children: [
      {
        path: '404',
        component: PageNotFoundComponent
      }, {
        path: '500',
        component: ErrorPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
