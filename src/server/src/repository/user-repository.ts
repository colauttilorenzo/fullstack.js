import { STRING, UUIDV4, UUID, DATE, NUMBER } from "sequelize";
import { User } from "../bo/models/user";
import { RepositoryBase } from "../bo/base/repository-base";
import { Profile } from "../bo/models/profile";
import { ProfileRespository } from "../repository/profile-repository";

export class UserRespository extends RepositoryBase {

    private profileRepository: ProfileRespository = new ProfileRespository();

    public constructor() {
        super();

        User.init(
            {
                id: {
                    type: UUID,
                    defaultValue: UUIDV4,
                    allowNull: false,
                    primaryKey: true
                },
                mail: {
                    type: STRING,
                    allowNull: false
                },
                password: {
                    type: STRING,
                    allowNull: false
                },
                firstName: {
                    type: STRING,
                    field: 'first_name',
                    allowNull: true
                },
                secondName: {
                    type: STRING,
                    field: 'second_name',
                    allowNull: true
                },
                profileid: {
                    type: NUMBER,
                    field: 'profile_id'
                }
            },
            {
                sequelize: this.connection.app,
                underscored: true,
                timestamps: false,
                tableName: 'users'
            }
        );

        User.hasOne(Profile, {
            sourceKey: 'profileid',
            foreignKey: 'id',
            as: 'profile'
        });

    }

    public async findAll(whereClause: any = undefined): Promise<Array<User>> {
        return await User.findAll(whereClause);
    }

    public async findByUsernameAndPassword(identity: string, password: string): Promise<User> {
        const data = await User.findOne({
            where: {
                mail: identity,
                password: password
            },
            include: [User.associations.profile]
        });

        if (data === undefined || data === null) {
            throw 'UserCredentialsNotMatched';
        }

        return data;
    }

    public async findById(id: string): Promise<User> {
        const data = await User.findOne({
            where: {
                id: id
            },
            limit: 1,
            include: [User.associations.profile]
        });

        if (data === undefined || data === null) {
            throw 'UserNotFound';
        }

        return data;
    }

    public async findByUsername(mail: string): Promise<User> {
        const data = await User.findOne({
            where: {
                mail: mail
            },
            limit: 1,
            include: [User.associations.profile]
        });

        if (data === undefined || data === null) {
            throw 'UserNotFound';
        }

        return data;
    }

}