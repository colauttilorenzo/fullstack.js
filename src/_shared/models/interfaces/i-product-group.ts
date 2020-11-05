import { IProduct } from "./i-product";

export interface IProductGroup {

    id?: string;
    companyid?: string;
    userid?: string;
    groupid?: string;
    description?: string;
    active?: boolean;

    items: Array<IProduct>;
    
}