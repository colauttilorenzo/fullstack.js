// ---------------- libraries ---------------
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
// ---------------- libraries ---------------

import { MenuInfo } from '@models/menu-info';
import { ServiceBase } from './base/service-base';
import { OverlayService } from './overlay.service';
import { SpinnerService } from './spinner.service';

@Injectable()
export class SidebarService extends ServiceBase {

    private _isopen: BehaviorSubject<boolean>;
    public isopen: Observable<boolean>;

    private _data: BehaviorSubject<MenuInfo>;
    public data: Observable<MenuInfo>;

    private _spinnerSubscription: Subscription = new Subscription();
    public isspinneractive: boolean = false;

    constructor(private overlay: OverlayService, private spinner: SpinnerService) {
        super();
        this._isopen = new BehaviorSubject<boolean>(false);
        this.isopen = this._isopen.asObservable();

        this._data = new BehaviorSubject<MenuInfo>(new MenuInfo());
        this.data = this._data.asObservable();


        this.overlay.setExitDelegate = () => {
            this.close();
        };

        this._spinnerSubscription = this.spinner.isactive.subscribe((data: boolean) => {
            this.isspinneractive = data;
        });
    }

    public destroy() {
        this._spinnerSubscription.unsubscribe();
    }

    public set set(value: MenuInfo) {
        this._data.next(value);
    }

    public open(): void {
        this._isopen.next(true);
        this.overlay.set = true;

        if (this.isspinneractive === false) {
            this.overlay.set = true;
        }
    }

    public close(): void {
        this._isopen.next(false);
        this.overlay.set = false;

        this._menu_action('', false);
    }

    public openbykey(key: string): void {
        this._menu_action(key, true);
    }

    public closebykey(key: string): void {
        this._menu_action(key, false);
    }

    private _menu_action(key: string, isopen: boolean): void {
        const _menu: MenuInfo = this._data.value;

        for (let i = 0; i < _menu.menu.level.length; i++) {
            const _levelinfo = _menu.menu.level[i];

            if (key === '' || _levelinfo.parent === key) {
                _levelinfo.isOpen = isopen;
                if (_levelinfo.parent === key) {
                    break;
                }
            }

        }
    }

}