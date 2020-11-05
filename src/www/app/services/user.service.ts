// ---------------- libraries ---------------
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// ---------------- libraries ---------------

import { HttpServiceBase } from '@services/base/http-service-base';
import { User } from '@models/user';
import { StorageService } from './storage.service';


@Injectable()
export class UserService extends HttpServiceBase {

    private readonly CONST_STORAGE_KEY: string = 'currentuser';

    private _current: BehaviorSubject<User>;
    public current: Observable<User>;

    constructor(http: HttpClient, private store: StorageService) {
        super(http);

        const localdata = this.store.get(this.CONST_STORAGE_KEY, User);

        this._current = new BehaviorSubject<User>(localdata);
        this.current = this._current.asObservable();

    }

    public getcurrent(): Observable<User> {
        
        let result: Observable<User> = this.current;
        if (this._current.value.isempty) {

            result = this.service.get<User>('user/getcurrent', {}, {})
                .pipe(map((data: User) => {
                    if (data) {
                        this._current.next(data);
                        this.store.save(this.CONST_STORAGE_KEY, data);
                    }

                    return data;
                }));

        }

        return result;

    }

    public get(id: string): Observable<User> {

        return this.service.post<User>('user/get', { id: id })
            .pipe(map((data: User) => {
                return data;
            }));

    }

    public getlist(filter: any): Observable<Array<User>> {

        return this.service.get<Array<User>>('user/getlist', { filter: filter })
            .pipe(map((data: Array<User>) => {
                return data;
            }));

    }

}