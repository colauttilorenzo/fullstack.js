// ---------------- libraries ---------------
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
// ---------------- libraries ---------------

import { PageHeaderInfo } from '@models/page-header-info';
import { StorageService } from './storage.service';


@Injectable()
export class PageHeaderService {

    private _data: BehaviorSubject<PageHeaderInfo>;
    public data: Observable<PageHeaderInfo>;

    constructor(private store: StorageService) {
        this._data = new BehaviorSubject<PageHeaderInfo>(new PageHeaderInfo());
        this.data = this._data.asObservable();
    }

    public set set(value: PageHeaderInfo) {
        this._data.next(value);
    }
    
}