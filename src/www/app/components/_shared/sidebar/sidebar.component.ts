// ---------------- libraries ---------------
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// ---------------- libraries ---------------

import { NavigateService } from '@services/navigate.service';
import { ApplicationService } from '@services/application.service';
import { ApplicationInfo } from '@models/application-info';
import { OverlayService } from '@app/services/overlay.service';
import { MenuInfo, MenuItemInfo } from '@models/menu-info';
import { SpinnerService } from '@app/services/spinner.service';
import { SidebarService } from '@app/services/sidebar.service';


@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  private _infoSubscription: Subscription = new Subscription();
  public info: ApplicationInfo = new ApplicationInfo();

  public ismenuopen: boolean = false;

  private _spinnerSubscription: Subscription = new Subscription();
  public isspinneractive: boolean = false;

  constructor(private nav: NavigateService, private bar: SidebarService, private app: ApplicationService, private overlay: OverlayService, private spinner: SpinnerService) {

    this._infoSubscription = this.app.get().subscribe((data: ApplicationInfo) => {
      this.info = data;
      this.bar.set = data.menu;
    });

    this.spinner.isactive.subscribe((data: boolean) => {
      this.isspinneractive = data;
    });

    this.bar.isopen.subscribe((data: boolean) => {
      this.ismenuopen = data;
    });

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this._infoSubscription.unsubscribe();
    this._spinnerSubscription.unsubscribe();
    this.bar.destroy();
  }

  public sidebar(isopen: boolean): void {
    if(isopen) {
      this.bar.open();
    } else {
      this.bar.close();
    }
  }

  public openchild(levelkey: string): void {
    this.bar.openbykey(levelkey);
  }

  public closechild(parentkey: string): void {
    this.bar.closebykey(parentkey);
  }
  
  public do(item: MenuItemInfo): void {
    if(item.key) {
      this.openchild(item.key);
      return;
    }

    this.nav.go(item.action ?? '');
    this.sidebar(false);
  }

}