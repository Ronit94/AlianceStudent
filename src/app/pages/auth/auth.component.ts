import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public currentURL: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    if (this.router.url.includes('register')) {
      this.currentURL = 'register'
    } else if (this.router.url.includes('login')) {
      this.currentURL = 'login'
    }
  }

  URLClick(param: String) {
    this.currentURL = param
    console.log('this', this.currentURL)
  }

}
