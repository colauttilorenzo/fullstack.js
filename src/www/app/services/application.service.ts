// ---------------- libraries ---------------
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// ---------------- libraries ---------------

import { ApplicationInfo } from '@models/application-info';
import { HttpServiceBase } from '@services/base/http-service-base';
import { StorageService } from '@services/storage.service';


@Injectable()
export class ApplicationService extends HttpServiceBase {

    private readonly CONST_STORAGE_KEY: string = 'data';

    private _data: BehaviorSubject<ApplicationInfo>;
    public data: Observable<ApplicationInfo>;

    constructor(http: HttpClient, private store: StorageService) {
        super(http);

        const localdata = this.store.get(this.CONST_STORAGE_KEY, ApplicationInfo);

        this._data = new BehaviorSubject<ApplicationInfo>(localdata);
        this.data = this._data.asObservable();
    }

    private set set(value: ApplicationInfo) {
        this._data.next(value);
        this.store.save(this.CONST_STORAGE_KEY, value);
    }

    public get(): Observable<ApplicationInfo> {

        let result: Observable<ApplicationInfo> = this.data;
        if (this._data.value.isempty) {

            result = this.service.post<ApplicationInfo>('configuration/get')
                .pipe(map((data: ApplicationInfo) => {
                    if (data) {
                        this.set = data;
                    }

                    return data;
                }));

        }

        return result;

    }

}