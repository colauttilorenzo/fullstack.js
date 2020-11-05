import { Model } from 'sequelize';

export class Config extends Model {

    public id!: string;
    public dscr!: string;

    // auditing
    public readonly createdAt!: Date;
    public readonly createdBy!: string;
    public readonly updatedAt!: Date;
    public readonly updatedBy!: string;

}
