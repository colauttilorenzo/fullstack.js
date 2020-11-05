import { UUIDV4, UUID, DATE, Op } from "sequelize";
import moment from 'moment'
import { RepositoryBase } from "../bo/base/repository-base";
import { AuthenticationToken } from "../bo/models/authentication-token";
import { User } from "../bo/models/user";
import { UserRespository } from "../repository/user-repository";

const DATE_FORMAT: string = 'YYYY-MM-DDTHH:mm:ss';

export class LoginRespository extends RepositoryBase {

    private userRepository: UserRespository = new UserRespository();

    public constructor() {
        super();

        AuthenticationToken.init(
            {
                id: {
                    type: UUID,
                    defaultValue: UUIDV4,
                    allowNull: false,
                    primaryKey: true
                },
                userid: {
                    type: UUID,
                    field: 'user_id',
                    allowNull: false,
                    primaryKey: true
                },
                expired: {
                    type: DATE,
                    field: 'expired',
                    allowNull: true
                }
            },
            {
                sequelize: this.connection.app,
                underscored: true,
                timestamps: false,
                tableName: 'logs'
            }
        );

        AuthenticationToken.hasOne(User, {
            sourceKey: 'userid',
            foreignKey: 'id',
            as: 'user'
        });

    }

    public async findSessionAndGetNewSession(id: string, userid: string): Promise<AuthenticationToken> {
        const data:AuthenticationToken = await this.findLastActive(id);
        if (data === undefined) {
            throw 'OutOfSessionException';
        }

        if(data.userid !== userid) {
            throw 'BearerAndUserNotMatch';
        }

        await this.logout(id);
        return await this.loginWithoutPassword(data.userid);
    }

    private async findLastActive(id: string): Promise<AuthenticationToken> {
        return await AuthenticationToken.findOne({
            where: {
                id: id,
                [Op.or]: [
                    {
                        expired: {
                            [Op.gte]: moment()
                        }
                    },
                    {
                        expired: {
                            [Op.eq]: null
                        }
                    }
                ]
            },
            order: [['expired', 'DESC']],
            limit: 1,
            rejectOnEmpty: false,
            include: [AuthenticationToken.associations.user]
        });
    }

    private async loginWithoutPassword(userid: string): Promise<AuthenticationToken> {
        const data = await this.userRepository.findById(userid);
        if (data.id === undefined || data.id === '') {
            throw 'UserNotFound'
        }

        let login: AuthenticationToken = new AuthenticationToken();
        login.userid = data.id;
        login.expired = moment().add(10, 'minutes').toDate();

        return await login.save();
    }

    private async createLogin(userid: string = ''): Promise<AuthenticationToken> {
        const login: AuthenticationToken = new AuthenticationToken();
        login.userid = userid;
        login.expired = moment().add(30, 'days').toDate();

        return login.save();
    }

    public async login(username: string, password: string): Promise<AuthenticationToken> {
        const data = await this.userRepository.findByUsernameAndPassword(username, password);
        if (data.id === undefined || data.id === '') {
            throw 'UserCredentialsNotMatched';
        }

        return this.createLogin(data.id);
    }

    public async loginGuest(id: string = ''): Promise<AuthenticationToken> {
        let data: Promise<AuthenticationToken>;

        if(id === '') {
            data = this.createLogin('');
        } else {
            data = this.findLastActive(id);

            const login: AuthenticationToken = await data;
            if (login.id === undefined || login.id === '') {
                throw 'GuestNotFound';
            }
        }
        
        return data;
    }

    public async logout(id: string): Promise<AuthenticationToken> {
        const data = await this.findLastActive(id);
        if (data.id === undefined || data.id === '') {
            throw 'LoginNotFound';
        }

        const expired: Date = moment().add(1, 'second').toDate();
        return await data.update({ expired: expired });
    }
}