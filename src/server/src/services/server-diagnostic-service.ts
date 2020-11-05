import { ServiceBase } from "../bo/base/service-base";
import { HttpVerb } from "../bo/http-verb";

export class ServerDiagnostic extends ServiceBase {

    public constructor() {
        super('serverdiagnostic');

        this.service(this.isUp, HttpVerb.GET, '/isup');
    }

    private isUp(req: any, res: any): any {

        res.send(true);

    }
}