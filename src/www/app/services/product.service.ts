// ---------------- libraries ---------------
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// ---------------- libraries ---------------

import { HttpServiceBase } from '@services/base/http-service-base';
import { Product } from '@models/product';


@Injectable()
export class ProductService extends HttpServiceBase {

    constructor(http: HttpClient) {
        super(http);

    }

    public get(id: string): Observable<Product> {

        return this.service.post<Product>('product/get', { id: id })
            .pipe(map((data: Product) => {
                return data;
            }));

    }

    public getlist(filter: any): Observable<Array<Product>> {

        return this.service.get<Array<Product>>('product/getlist', { filter: filter })
            .pipe(map((data: Array<Product>) => {
                return data;
            }));

    }

}