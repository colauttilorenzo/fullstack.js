import { STRING, NUMBER } from "sequelize";
import { RepositoryBase } from "../bo/base/repository-base";
import { Profile } from "../bo/models/profile";

export class ProfileRespository extends RepositoryBase {

    public constructor() {
        super();

        Profile.init(
            {
                id: {
                    type: NUMBER,
                    allowNull: false,
                    primaryKey: true
                },
                dscr: {
                    type: STRING,
                    allowNull: false
                }
            },
            {
                sequelize: this.connection.app,
                underscored: true,
                timestamps: false,
                tableName: '_PROFILE'
            }
        );

    }

    public async findAll(): Promise<Array<Profile>> {
        return await Profile.findAll();
    }

}