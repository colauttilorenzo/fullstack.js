// ---------------- libraries ---------------
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// ---------------- libraries ---------------

import { HttpServiceBase } from '@services/base/http-service-base';
import { AuthenticationToken } from '@models/authentication-token';
import { User } from '@models/user';
import { StorageService } from '@services/storage.service';


@Injectable()
export class AuthenticationService extends HttpServiceBase {

    private readonly CONST_STORAGE_KEY: string = 'token';

    private _data: BehaviorSubject<AuthenticationToken|null>;
    public data: Observable<AuthenticationToken|null>;

    constructor(http: HttpClient, private store: StorageService) {
        super(http);
        
        const localdata = this.store.get(this.CONST_STORAGE_KEY, AuthenticationToken);

        this._data = new BehaviorSubject<AuthenticationToken|null>(localdata);
        this.data = this._data.asObservable();

    }

    public get get(): AuthenticationToken|null {
        return this._data.value;
    }

    private set set(value: AuthenticationToken) {
        this._data.next(value);
        this.store.save(this.CONST_STORAGE_KEY, value);
    }

    public signin(user: User): Observable<AuthenticationToken> {
        
        return this.service.post<AuthenticationToken>('authorization/login/get', {}, { mail: user.mail, password: user.password })
            .pipe(map((data: AuthenticationToken) => {
                if (data?.id) {
                    this.set = data;
                }

                return data;
            }));

    }

    public signup(user: User): Observable<AuthenticationToken> {

        return this.service.put<AuthenticationToken>('authorization/login/post', {}, { mail: user.mail, password: user.password })
            .pipe(map((data: AuthenticationToken) => {
                if (data?.id) {
                    this.set = data;
                }

                return data;
            }));
    }

    public signout(): void {
        
        this.store.remove(this.CONST_STORAGE_KEY);
        this._data.next(null);

        this.service.delete<AuthenticationToken>('authorization/login/delete', {}, {})
            .pipe(map((data: AuthenticationToken) => {
                if (data?.id) {
                    this.set = data;
                }

                return data;
            }));

    }

}