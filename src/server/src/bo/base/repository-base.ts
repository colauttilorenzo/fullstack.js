import { Sequelize } from "sequelize";
import { ServerConfiguration } from "../../server/server-configuration";
import { Configuration } from "../configuration";
import { IRepository } from "../interfaces/i-repository"

/**
 * base class to create repository object
 */
export class RepositoryBase implements IRepository {

    /** configured connections using [sequelize](https://sequelize.org/) */
    protected readonly connection: { [id: string]: Sequelize; } = {};

    /** construct object using ./environment/environment.*.ts module */
    protected constructor() {
        const config: Configuration = new ServerConfiguration().get();

        for (var dbName in config.databases) {

            let dbConfig = config.databases[dbName];
            this.connection[dbName] = new Sequelize(
                dbConfig.name ?? '',
                dbConfig.auth.username ?? '',
                dbConfig.auth.password ?? '',
                {
                    host: dbConfig.server.host ?? '',
                    dialect: <any>dbConfig.server.dialect,
                    dialectOptions: {
                        multipleStatements: true
                    }
                }
            );

        }
    }

}