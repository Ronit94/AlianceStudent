import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth-service.service'
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})

export class CanActivateGuard implements CanActivate {

  constructor(private auth: AuthServiceService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    this.auth.isLogin().subscribe((res) => {
      if (!res) {
        this.router.navigate(['pages/auth/login']);
        return false
      } else {
        this.router.navigate(['pages/dashboard/profile']);
        return false
      }
    })
    return true;
  }
}
