// ---------------- libraries ---------------
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// ---------------- libraries ---------------

import { IHttpServiceBase } from '@services/interface/i-http-service-base';
import { ServiceBase } from '@services/base/service-base';
import { Configuration } from '@models/configuration';

class HttpCrud {

    private http: HttpClient;
    private env: Configuration;

    constructor(http: HttpClient, env: Configuration) {
        this.http = http;
        this.env = env;
    }

    private getapi(api: string): string {
        const ext: string = (this.env.actionext !== '' ? '.' + this.env.actionext : '');
        return (this.env.baseapi + '/' + api + ext).replace(/\/{1,}/gm, '/');
    }

    public get<T>(api: string, data: { [id: string]: string } = {}, headers: { [id: string]: string } = {}): Observable<T> {
        api = this.getapi(api);
        return this.http.get<T>(api, { headers: headers, params: data });
    }

    public put<T>(api: string, data: { [id: string]: string } = {}, headers: { [id: string]: string } = {}): Observable<T> {
        api = this.getapi(api);
        return this.http.get<T>(api, { headers: headers, params: data });
    }

    public delete<T>(api: string, data: { [id: string]: string } = {}, headers: { [id: string]: string } = {}): Observable<T> {
        api = this.getapi(api);
        return this.http.get<T>(api, { headers: headers, params: data });
    }

    public post<T>(api: string, data: { [id: string]: string } = {}, headers: { [id: string]: string } = {}): Observable<T> {
        api = this.getapi(api);
        return this.http.get<T>(api, { headers: headers, params: data });
    }

}


@Injectable()
export abstract class HttpServiceBase extends ServiceBase implements IHttpServiceBase {

    protected service: HttpCrud;

    constructor(private http: HttpClient) {
        super();
        this.service = new HttpCrud(http, this.ENVIRONMENT);
    }


}