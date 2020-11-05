import { ServiceBase } from "../bo/base/service-base";
import { HttpVerb } from "../bo/http-verb";
import { LoginRespository } from "../repository/login-repository";
import { AuthenticationToken } from "../bo/models/authentication-token";

export class LoginService extends ServiceBase {

    public constructor() {
        super('auth');

        this.service(this.login, HttpVerb.POST);
        this.authService(this.logout, HttpVerb.POST);
    }

    private login(req: any, res: any) {
        const data: any = req.body;

        new LoginRespository().login(data.username, data.password).then((data: AuthenticationToken) => {

            res.send(data);

        }).catch((data: any) => {

            res.statusCode = 400;
            res.send(data);

        });

    }

    private logout(req: any, res: any) {
        const bearer: string = req.header('Bearer-Token');

        new LoginRespository().logout(bearer).then((data: AuthenticationToken) => {

            res.send(data);

        }).catch((data: any) => {

            res.statusCode = 400;
            res.send(data);

        });

    }

}