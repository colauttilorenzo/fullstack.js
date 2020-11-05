// ---------------- libraries ---------------
import { Injectable } from '@angular/core';
// ---------------- libraries ---------------

import '@shared/helpers/object-extension';
import { AuthenticationToken } from '@models/authentication-token';
import { ServiceBase } from '@services/base/service-base';


@Injectable()
export class StorageService extends ServiceBase {

    constructor() {
        super();
    }

    public gettoken(): AuthenticationToken {
        return this.get('token', AuthenticationToken);
    }

    private _getstorage(): { [key: string]: any } {
        const keydatastorage: string = this.ENVIRONMENT.keydatastorage;

        if (typeof(keydatastorage) !== 'string') {
            throw 'keydatastorage has not a value';
        }

        const localdata: string = localStorage.getItem(keydatastorage) || '{}';
        const result: any = JSON.parse(localdata);

        return result;
    }

    public get<T extends Object>(key: string, type: new () => T): T {
        const result = this._getstorage();
        return Object.cast<T>(result[key], type);
    }

    public save<T extends Object>(key: string, data: T): void {
        
        const keydatastorage: string = this.ENVIRONMENT.keydatastorage;

        if (typeof(keydatastorage) !== 'string') {
            throw 'keydatastorage has not a value';
        }

        const storage = this._getstorage();
        storage[key] = data;

        localStorage.setItem(keydatastorage, JSON.stringify(storage));
    }

    public remove(key: string): void {
        const keydatastorage: string = this.ENVIRONMENT.keydatastorage;

        if (typeof(keydatastorage) !== 'string') {
            throw 'keydatastorage has not a value';
        }

        localStorage.removeItem(keydatastorage);
    }

}