// ---------------- libraries ---------------
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
// ---------------- libraries ---------------

import '@shared/helpers/string-extension';
import { PageHeaderService } from '@services/page-header.service';
import { NavigateService } from '@services/navigate.service';
import { PageHeaderInfo } from '@models/page-header-info';
import { UserService } from '@app/services/user.service';
import { ProductService } from '@app/services/product.service';


@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {

  private _parameterSubscription: Subscription = new Subscription();

  private _PAGE_TITLE: string = 'Menu {id}';
  private id?: string;

  constructor(
    private page: PageHeaderService,
    private nav: NavigateService,
    private user: UserService,
    private product: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this._parameterSubscription = this.route.params.subscribe(params => {
      this.id = params['id'];

      let id: string = '';
      if (this.id != undefined) {
        id = this.id;
      }

      const pageheader: PageHeaderInfo = new PageHeaderInfo();
      pageheader.title = this._PAGE_TITLE.formatUnicorn({ id: id });
      pageheader.description = '';

      this.page.set = pageheader;
    });
  }

  ngOnDestroy() {
    
  }

}