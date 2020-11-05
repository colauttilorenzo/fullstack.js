// ---------------- libraries ---------------
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// ---------------- libraries ---------------

import { HttpServiceBase } from '@services/base/http-service-base';
import { Company } from '@models/company';


@Injectable()
export class CompanyService extends HttpServiceBase {

    constructor(http: HttpClient) {
        super(http);

    }

    public get(id: string): Observable<Company> {

        return this.service.post<Company>('company/get', { id: id })
            .pipe(map((data: Company) => {
                return data;
            }));

    }

    public getlist(filter: any): Observable<Array<Company>> {

        return this.service.get<Array<Company>>('company/getlist', { filter: filter })
            .pipe(map((data: Array<Company>) => {
                return data;
            }));

    }

}