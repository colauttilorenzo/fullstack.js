// ---------------- libraries ---------------
import { IProductGroup } from '@shared/models/interfaces/i-product-group';
import { ModelBase } from '@models/abstracts/model-base';
import { Product } from '@models/product';
// ---------------- libraries ---------------

export class ProductGroup extends ModelBase implements IProductGroup {
    public id!: string;
    public companyid!: string;
    public userid!: string;
    public groupid!: string;
    public description!: string;
    public active!: boolean;

    public items: Array<Product> = new Array<Product>();

    constructor(obj: any = {}) {
        super();
        this.builder(obj);
    }
}