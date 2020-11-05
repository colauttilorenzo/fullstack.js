// ---------------- libraries ---------------
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// ---------------- libraries ---------------

import { PageHeaderService } from '@services/page-header.service';
import { NavigateService } from '@services/navigate.service';
import { PageHeaderInfo } from '@models/page-header-info';
import { User } from '@models/user';
import { UserService } from '@app/services/user.service';
import { ProductService } from '@app/services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private readonly _PAGE_TITLE: string = 'Dashboard';

  private _userprofileSubscription: Subscription = new Subscription();
  private userprofile: User = new User();

  constructor(
    private page: PageHeaderService,
    private user: UserService
  ) { }

  ngOnInit() {
    const pageheader: PageHeaderInfo = new PageHeaderInfo();
    pageheader.title = this._PAGE_TITLE;
    pageheader.description = '';

    this.page.set = pageheader;

    this._userprofileSubscription = this.user.getcurrent().subscribe(
      (user: User) => {
        this.userprofile = user;
      });
  }

  ngOnDestroy() {
    this._userprofileSubscription.unsubscribe();
  }

}