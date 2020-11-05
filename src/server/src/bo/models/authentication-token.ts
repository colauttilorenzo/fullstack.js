import { Model, Association } from "sequelize";
import { IAuthenticationToken } from '../../_shared/models/interfaces/i-authentication-token';
import { User } from "./user";

export class AuthenticationToken extends Model implements IAuthenticationToken {

    public id!: string;
    public userid!: string;
    public expired!: Date;

    public isLogged: boolean = false;

    // auditing
    public readonly createdAt!: Date;
    public readonly createdBy!: string;
    public readonly updatedAt!: Date;
    public readonly updatedBy!: string;

    // references
    public readonly user?: User;

    // static properties for references
    public static associations: {
        user: Association<AuthenticationToken, User>;
    };

}