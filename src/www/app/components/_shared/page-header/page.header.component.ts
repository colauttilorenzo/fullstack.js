// ---------------- libraries ---------------
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// ---------------- libraries ---------------

import { PageHeaderService } from '@services/page-header.service';
import { PageHeaderInfo } from '@models/page-header-info';


@Component({
  selector: 'page-header',
  templateUrl: './page.header.component.html',
  styleUrls: ['./page.header.component.scss']
})
export class PageHeaderComponent implements OnInit, OnDestroy {

  public _pageSubscription: Subscription = new Subscription();

  public title?: string;
  public description?: string;

  constructor(private page: PageHeaderService) { }

  ngOnInit() {
    this._pageSubscription = this.page.data.subscribe(
      (data: PageHeaderInfo) => {
        this.title = data.title;
        this.description = data.description;
      });
  }

  ngOnDestroy() {
    this._pageSubscription.unsubscribe();
  }

}