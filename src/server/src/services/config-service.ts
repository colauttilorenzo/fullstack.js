import { ServiceBase } from "../bo/base/service-base";
import { HttpVerb } from "../bo/http-verb";
import { ConfigRespository } from "../repository/config-repository";
import { Config } from "../bo/models/config";

export class ConfigService extends ServiceBase {

    public constructor() {
        super('config');

        this.service(this.getList, HttpVerb.GET, '/get');
    }

    private getList(req: any, res: any): any {

        new ConfigRespository().findAll().then((data: Array<Config>) => {

            res.send(data);

        }).catch((data: any) => {

            res.statusCode = 400;
            res.send(data);

        });

    }
}