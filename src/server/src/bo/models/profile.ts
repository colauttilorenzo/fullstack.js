import { Model } from 'sequelize';

export class Profile extends Model {

    public id!: number;
    public dscr!: string;

}