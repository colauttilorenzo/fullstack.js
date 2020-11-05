import express from 'express';
import { HttpVerb } from '../http-verb';
import { Server } from '../../server/server';

import '../../_shared/helpers/string-extension';
import { LoginRespository } from '../../repository/login-repository';

/**
 * Base class for all services (webapi controllers).
 * This class provides common methods to expose api over HTTP protocol.
 */
export class ServiceBase {

    private modulePath: string;
    public static Services: ServiceBase[] = [];

    /**
     * @param modulePath controller's name.
     */
    protected constructor(modulePath: string) {
        this.modulePath = modulePath;
        ServiceBase.Services.push(this);
    }

    /**
     * service method is used to register an action.
     * @param handler   http request context.
     * @param httpverb  http verb used to gain access to perform this action.
     * @param action    action name, if empty then the action name will be replaced with the method's name.
     */
    protected service(handler: express.RequestHandler, httpverb: HttpVerb = HttpVerb.GET, action: string = '') {
        if (action.replace(/ /gm, '') === '') {
            action = handler.name;
        }

        action = '${module}/${action}'.formatUnicorn({ module: this.modulePath, action: action });
        Server.register(handler, httpverb, action);
    }

    /**
     * auth service method is used to register an action with security check.
     * @param handler   http request context.
     * @param httpverb  http verb used to gain access to perform this action.
     * @param action    action name, if empty then the action name will be replaced with the method's name.
     */
    protected authService(handler: express.RequestHandler, httpverb: HttpVerb = HttpVerb.GET, action: string = '') {
        if (action.replace(/ /gm, '') === '') {
            action = handler.name;
        }

        action = '${module}/${action}'.formatUnicorn({ module: this.modulePath, action: action });
        let authHandler: any = function (req: any, res: any): any {

            const bearer: string = req.header('Access-Token');
            const userId: string = req.header('Identity');

            new LoginRespository().findSessionAndGetNewSession(bearer, userId).then((data: any) => {

                handler(req, res, () => { });

            }).catch((data: any) => {

                res.statusCode = 401;
                res.send(data);

            });

        };

        Server.register(authHandler, httpverb, action);
    }

}