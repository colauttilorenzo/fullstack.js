// ---------------- libraries ---------------
import { IAuthenticationToken } from '@shared/models/interfaces/i-authentication-token';
import { ModelBase } from "@models/abstracts/model-base";
import { User } from "@models/user";
// ---------------- libraries ---------------

export class AuthenticationToken extends ModelBase implements IAuthenticationToken {
    public isLogged: boolean;
    public id?: string;
    public expired?: Date;
    public user?: User;

    constructor() {
        super();

        this.isLogged = false;
    }
}