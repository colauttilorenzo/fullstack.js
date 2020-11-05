// ---------------- libraries ---------------
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigateService } from '@app/services/navigate.service';
// ---------------- libraries ---------------

import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthenticationService, private nav: NavigateService) {

  }

  ngOnInit() {
    this.auth.signout();
    this.nav.location('authorization/signin');
  }

  ngOnDestroy() {

  }

}