// ---------------- libraries ---------------
import { IUser } from '@shared/models/interfaces/i-user';
import { ModelBase } from '@models/abstracts/model-base';
import { Company } from '@models/company';
// ---------------- libraries ---------------

export class User extends ModelBase implements IUser {
    public id!: string;
    public mail!: string;
    public password!: string;
    public firstname!: string;
    public secondname!: string;
    
    public companies: Array<Company> = new Array<Company>();

    constructor(obj: any = {}) {
        super();
        this.builder(obj);
    }

    public get isempty(): boolean {
        return (typeof(this.id) !== 'undefined' && this.id !== '') === false;
    }
}