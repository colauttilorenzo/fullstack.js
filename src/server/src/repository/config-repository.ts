import { STRING, UUIDV4, UUID } from "sequelize";
import { Config } from "../bo/models/config";
import { RepositoryBase } from "../bo/base/repository-base";

export class ConfigRespository extends RepositoryBase {

    public constructor() {
        super();

        Config.init(
            {
                id: {
                    type: UUID,
                    defaultValue: UUIDV4,
                    allowNull: false,
                    primaryKey: true
                },
                dscr: {
                    type: STRING,
                    allowNull: true
                }
            },
            {
                sequelize: this.connection.app,
                underscored: true,
                timestamps: false,
                tableName: 'config'
            }
        );

    }

    public async findAll(): Promise<Array<Config>> {
        return await Config.findAll();
    }

}