// ---------------- libraries ---------------
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
// ---------------- libraries ---------------

import { ApplicationService } from '@services/application.service';
import { User } from '@models/user';
import { ApplicationInfo } from '@models/application-info';
import { AuthenticationService } from '@services/authentication.service';
import { AuthenticationToken } from '@models/authentication-token';
import { NavigateService } from '@app/services/navigate.service';


@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  private readonly IDENTITY_MIN_LENGTH: number = 0;
  private readonly PASSWORD_MIN_LENGTH: number = 8;
  private readonly PASSWORD_MAX_LENGTH: number = 16;

  private redirecturl: string = '/home/dashboard';

  public _infoSubscription: Subscription = new Subscription();
  public info: ApplicationInfo = new ApplicationInfo();

  public isPasswordVisible: boolean = false;

  public login: FormGroup = new FormGroup({
    mail: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(this.IDENTITY_MIN_LENGTH),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.PASSWORD_MIN_LENGTH),
      Validators.maxLength(this.PASSWORD_MAX_LENGTH),
      Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9])(?=[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/)
    ]),
    keepalive: new FormControl(true)
  });

  get mail(): AbstractControl | null { return this.login.get('mail'); }
  get password(): AbstractControl | null { return this.login.get('password'); }

  constructor(
    private app: ApplicationService,
    private auth: AuthenticationService,
    private nav: NavigateService
  ) {
    this._infoSubscription = this.app.get().subscribe((data: ApplicationInfo) => {
      this.info = data;
    });

  }

  ngOnInit() {
    this.redirecturl = this.nav.getLocationCallback();
    if (this.auth.get?.id) {
      this.nav.location(this.redirecturl);
    }
  }

  ngOnDestroy() {
    this._infoSubscription.unsubscribe();
  }

  onsubmit(): void {

    const user: User = new User({ mail: this.login.value.mail, password: this.login.value.password });

    // stop here if form is invalid
    if (this.login.invalid) {
      return;
    }

    //this.loading = true;
    this.auth.signup(user)
      .pipe(first())
      .subscribe(
        (data: AuthenticationToken) => {
          this.nav.location(this.redirecturl);
        },
        (error: any) => {
          //this.alertService.error(error);
          //this.loading = false;
        });

  }

  gosignup() {
    this.nav.location('/authorization/signin');
  }

}