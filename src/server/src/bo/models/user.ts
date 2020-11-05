// ---------------- libraries ---------------
import { Model } from 'sequelize';
import { IUser } from '../../_shared/models/interfaces/i-user';
import { ICompany } from '../../_shared/models/interfaces/i-company';
import { Profile } from './profile';
// ---------------- libraries ---------------

export class User extends Model implements IUser {

    public id!: string;
    public mail!: string;
    public password!: string;
    public firstname!: string;
    public secondname!: string;

    public profile!: Profile
    public companies!: Array<ICompany>

    // auditing
    public readonly createdAt!: Date;
    public readonly createdBy!: string;
    public readonly updatedAt!: Date;
    public readonly updatedBy!: string;

}