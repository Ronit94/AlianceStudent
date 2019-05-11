import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../providers/auth-service.service';
import { user } from '../../../models/userModels';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userData: any;
  tagTitleTpl:any='Hello'
  constructor(
    private auth: AuthServiceService
  ) { }

  ngOnInit() {
    this.auth.userData$.subscribe((res) => {
      this.userData = res
      console.log('userData', this.userData)
    })
  }

}
