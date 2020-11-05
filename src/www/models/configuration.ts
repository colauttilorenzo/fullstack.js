// ---------------- libraries ---------------
import { IConfiguration } from "@shared/models/interfaces/i-configuration";
import { ModelBase } from "@models/abstracts/model-base";
// ---------------- libraries ---------------

export class Configuration extends ModelBase implements IConfiguration {
    public production: boolean = false;
    public baseapi!: string;
    public actionext: string = '';
    public keydatastorage: string = '';

    constructor(obj: any) {
        super();
        this.builder<Configuration>(obj);
    }
}