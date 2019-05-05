import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../providers/common-service.service'
import { NzMessageService } from 'ng-zorro-antd';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router'
import { AuthServiceService } from '../../../providers/auth-service.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  colleges = []
  states = []
  fetchCollegeDetailsRes: any;
  passwordVisible = false;
  constructor(
    private fb: FormBuilder,
    private commonService: CommonServiceService,
    private msg: NzMessageService,
    protected ls: LocalStorage,
    public router: Router,
    protected auth: AuthServiceService
  ) { }


  ngOnInit() {
    this.validateForm = this.fb.group({
      AdminID: [null, [Validators.required]],
      password: [null, [Validators.required]],
      collegeName: [null, [Validators.required]],
      stateName: [null, [Validators.required]],
      remember: [true]
    });
    this.fetchCollegeDetails()
  }


  submitForm(): void {
    if (!this.validateForm.valid) {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    } else {
      this.commonService.commonPostHttpService('admin/login', this.validateForm.value, 'Admin Login').subscribe((res) => {
        if (res.responseCode === 404) {
          this.msg.warning(`${res.responseText}`)
        } else if (res.responseCode === 500) {
          this.msg.error(`${res.responseText}`)
        } else if (res.responseCode === 402) {
          this.msg.info(`${res.responseText}`)
        } else if (res.responseCode === 200) {
          this.auth.setToken(res.responseData.authToken).subscribe((token) => {
            if (token) {
              this.auth.setUserData(res.responseData)
              this.router.navigate(['pages/dashboard/profile'])
            } else if (token instanceof Error) {
              this.msg.error('Token cant saved')
            }
          })
        }
      })
    }
  }

  fetchCollegeDetails() {
    let url = 'core/fetch-college-data'
    this.fetchCollegeDetailsRes = this.commonService.commonGetHttpService(url, 'Fetch College Details').subscribe((res) => {
      if (res.responseCode === 200) {
        this.colleges = res.responseData.college_Name
        this.states = res.responseData.college_state
      }
    })
  }



}
