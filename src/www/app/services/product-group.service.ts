// ---------------- libraries ---------------
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// ---------------- libraries ---------------

import { HttpServiceBase } from '@services/base/http-service-base';
import { ProductGroup } from '@models/productgroup';


@Injectable()
export class ProductGroupService extends HttpServiceBase {

    constructor(http: HttpClient) {
        super(http);

    }

    public get(id: string): Observable<ProductGroup> {

        return this.service.post<ProductGroup>('productgroup/get', { id: id })
            .pipe(map((data: ProductGroup) => {
                return data;
            }));

    }

    public getlist(filter: any): Observable<Array<ProductGroup>> {

        return this.service.get<Array<ProductGroup>>('productgroup/getlist', { filter: filter })
            .pipe(map((data: Array<ProductGroup>) => {
                return data;
            }));

    }

}