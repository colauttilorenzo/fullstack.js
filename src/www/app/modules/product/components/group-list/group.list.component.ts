// ---------------- libraries ---------------
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// ---------------- libraries ---------------

import '@shared/helpers/string-extension';
import { PageHeaderService } from '@services/page-header.service';
import { CompanyService } from '@app/services/company.service';
import { PageHeaderInfo } from '@models/page-header-info';
import { ProductGroup } from '@models/productgroup';
import { ProductGroupService } from '@app/services/product-group.service';
import { Company } from '@models/company';


@Component({
  selector: 'grouplist',
  templateUrl: './group.list.component.html',
  styleUrls: ['./group.list.component.scss']
})
export class GroupListComponent implements OnInit, OnDestroy {

  private readonly _PAGE_TITLE: string = 'Liste di prodotti';
  private readonly _PAGE_DESCRIPTION: string = 'Società ${name}';

  private _groupSubscription: Subscription = new Subscription();
  private grouplist: Array<ProductGroup> = new Array<ProductGroup>();

  private _companySubscription: Subscription = new Subscription();
  private companydetail: Company = new Company();

  constructor(
    private page: PageHeaderService,
    private group: ProductGroupService,
    private company: CompanyService
  ) { }

  ngOnInit() {
    this._groupSubscription = this.group.getlist({}).subscribe(
      (data: Array<ProductGroup>) => {
        this.grouplist = data;

        this._companySubscription = this.company.get('').subscribe(
          (data: Company) => {
            this.companydetail = data;

            const pageheader: PageHeaderInfo = new PageHeaderInfo();
            pageheader.title = this._PAGE_TITLE;
            pageheader.description = this._PAGE_DESCRIPTION.formatUnicorn({ name: this.companydetail.description ?? '' });

            this.page.set = pageheader;
          });

      });
  }

  ngOnDestroy() {
    this._companySubscription.unsubscribe();
    this._groupSubscription.unsubscribe();
  }

}