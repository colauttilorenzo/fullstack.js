import { ServiceBase } from "../bo/base/service-base";
import { HttpVerb } from "../bo/http-verb";
import { UserRespository } from "../repository/user-repository";
import { User } from "../bo/models/user";

export class UserService extends ServiceBase {

    public constructor() {
        super('user');

        this.authService(this.get, HttpVerb.GET, '/get/:username');
        this.authService(this.getList, HttpVerb.GET, '/get');
    }

    private getList(req: any, res: any): any {

        new UserRespository().findAll().then((data: Array<User>) => {

            data.forEach((user: User) => {
                //delete user.pass; //TODO
            });

            res.send(data);

        }).catch((data: any) => {

            res.statusCode = 400;
            res.send(data);

        });

    }

    private get(req: any, res: any): any {

        const username: string = req.params.username;

        new UserRespository().findByUsername(username).then((data: User) => {

            //delete data.pass; //TODO
            res.send(data);

        }).catch((data: any) => {

            res.statusCode = 400;
            res.send(data);

        });

    }
}