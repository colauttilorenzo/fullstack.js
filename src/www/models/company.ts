// ---------------- libraries ---------------
import { ICompany } from '@shared/models/interfaces/i-company';
import { ModelBase } from "@models/abstracts/model-base";
// ---------------- libraries ---------------

export class Company extends ModelBase implements ICompany {
    public id?: string;
    public userid?: string;
    public description?: string;
    public address?: string;
    public number?: string;
    public city?: string;
    public zip?: string;
    public country?: string;

    constructor(obj: any = {}) {
        super();
        this.builder(obj);
    }
}