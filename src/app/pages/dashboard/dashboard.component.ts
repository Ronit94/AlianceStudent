import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { AuthServiceService } from '../../providers/auth-service.service';
import { Router } from '@angular/router';
import { user } from '../../models/userModels';
import { Observable } from 'rxjs'
import { CommonServiceService } from '../../providers/common-service.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;
  public userData$: Observable<user[]>;
  public imageURL: any;
  public routerMapping: Array<any> = []

  /** custom trigger can be TemplateRef **/

  constructor(
    private auth: AuthServiceService,
    private router: Router,
    private commonService: CommonServiceService
  ) {
    this.userData$ = this.auth.userData
    this.routerMapping = this.router.url.split('/').filter(ele => { return ele != '' })

  }

  ngOnInit() {
    this.auth.getToken().subscribe((res) => {
      this.commonService.commonGetHttpService('students/fetch-student-data', 'Fetch Students data').subscribe((res) => {
        if (res.responseCode === 200) {
          this.imageURL = res.responseData.profilePic
          this.auth.setUserData(res.responseData)
        }
      })
    })
  }

  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  Logout() {
    this.auth.deleteToken().subscribe((res) => {
      this.router.navigate(['pages/auth/login'])
    })
  }




}
