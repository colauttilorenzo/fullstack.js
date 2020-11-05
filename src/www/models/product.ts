// ---------------- libraries ---------------
import { IProduct } from '@shared/models/interfaces/i-product';
import { ModelBase } from '@models/abstracts/model-base';
// ---------------- libraries ---------------

export class Product extends ModelBase implements IProduct {
    public id!: string;
    public groupid!: string;
    public companyid!: string;
    public userid!: string;
    public name!: string;
    public description!: string;
    public type!: string;
    public price!: number;
    public specialprice!: boolean;
    public active!: boolean;

    constructor(obj: any = {}) {
        super();
        this.builder(obj);
    }
}